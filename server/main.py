# backend/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine, get_db
from mailer import send_order_notification
from auth import hash_password, verify_password, create_access_token
from fastapi import UploadFile, File, Form
from cloudinary_config import upload_image

app = FastAPI(title="Hope Epicure API")

# Temporary in-memory database
products_db = []

@app.get("/")
def read_root():
    return {"message": "Welcome to Hope Epicure API"}

# 1. Get all products (For the Customer Storefront)
@app.get("/products", response_model=List[Product])
def get_products():
    return products_db

# 2. Add a new product (For Hope's Admin Panel)
@app.post("/products", response_model=Product)
def create_product(product: Product):
    product.id = len(products_db) + 1
    products_db.append(product)
    return product

# 3. Toggle Availability (For Hope's Admin Panel)
@app.patch("/products/{product_id}")
def update_availability(product_id: int, available: bool):
    for p in products_db:
        if p.id == product_id:
            p.is_available = available
            return p
    raise HTTPException(status_code=404, detail="Product not found")

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hope Epicure API")

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.post("/products")
def create_product(product_data: dict, db: Session = Depends(get_db)):
    new_product = models.Product(**product_data)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.post("/orders")
def place_order(order_data: dict, db: Session = Depends(get_db)):
    # 1. Save to Database
    new_order = models.Order(**order_data)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    # 2. Trigger Email to Hope
    send_order_notification(order_data)
    
    return {"message": "Order placed successfully!", "order_id": new_order.id}

# Add this endpoint to your main.py
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

# 1. Signup Route
@app.post("/auth/signup")
def signup(user_data: dict, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(models.User).filter(models.User.email == user_data['email']).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password and save
    new_user = models.User(
        email=user_data['email'],
        hashed_password=hash_password(user_data['password'])
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

# 2. Login Route
@app.post("/auth/login")
def login(user_data: dict, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_data['email']).first()
    if not user or not verify_password(user_data['password'], user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate JWT
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "email": user.email}

@app.post("/orders")
def place_order(order_data: dict, db: Session = Depends(get_db)):
    # 1. Create the DB record
    new_order = models.Order(
        customer_name=order_data.get('customer_name', 'Member'),
        customer_email=order_data['customer_email'],
        product_name=order_data['product_name'],
        flavor=order_data['flavor'],
        quantity=order_data['quantity']
    )
    db.add(new_order)
    db.commit()
    
    # 2. Notify Hope via Email
    try:
        from mailer import send_order_notification
        send_order_notification(order_data)
    except Exception as e:
        print(f"Email failed but order saved: {e}")

    return {"status": "success", "message": "Hope has been notified!"}

@app.post("/products")
async def create_product(
    name: str = Form(...),
    price: float = Form(...),
    flavor: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...), # Receives the actual image file
    db: Session = Depends(get_db)
):
    # 1. Upload the file to Cloudinary
    image_url = upload_image(image.file)
    
    # 2. Save the product with the new URL to our DB
    new_product = models.Product(
        name=name, price=price, flavor=flavor, 
        description=description, image_url=image_url
    )
    db.add(new_product)
    db.commit()
    return new_product