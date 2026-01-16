# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine, get_db
from mailer import send_order_notification
from auth import hash_password, verify_password, create_access_token
from cloudinary_config import upload_image
from schemas import Product, ProductCreate, OrderCreate, UserCreate, Token

app = FastAPI(title="Hope Epicure API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables
models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to Hope Epicure API"}

# Products endpoints
@app.get("/products", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.post("/products", response_model=Product)
async def create_product(
    name: str = Form(...),
    price: float = Form(...),
    flavor: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Upload image to Cloudinary
        image_url = upload_image(image.file)

        # Save product to DB
        new_product = models.Product(
            name=name, price=price, flavor=flavor,
            description=description, image_url=image_url
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create product: {str(e)}")

@app.patch("/products/{product_id}", response_model=Product)
def update_availability(product_id: int, available: bool, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.is_available = available
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

# Orders endpoint
@app.post("/orders")
def place_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    try:
        # Create the DB record
        new_order = models.Order(**order_data.dict())
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        # Notify Hope via Email
        try:
            send_order_notification(order_data.dict())
        except Exception as e:
            print(f"Email failed but order saved: {e}")

        return {"status": "success", "message": "Hope has been notified!", "order_id": new_order.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to place order: {str(e)}")

# Auth endpoints
@app.post("/auth/signup")
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        # Validate input
        if not user_data.email or not user_data.password:
            raise HTTPException(status_code=400, detail="Email and password required")
        
        # Check if user exists
        existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash the password and save
        hashed_pwd = hash_password(user_data.password)
        new_user = models.User(
            email=user_data.email,
            hashed_password=hashed_pwd
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User created successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"Signup error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Signup failed. Please try again.")

@app.post("/auth/login", response_model=Token)
def login(user_data: dict, db: Session = Depends(get_db)):
    try:
        email = user_data.get('email')
        password = user_data.get('password')
        
        if not email or not password:
            raise HTTPException(status_code=400, detail="Email and password required")
        
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Generate JWT
        token = create_access_token(data={"sub": user.email})
        return {"access_token": token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")