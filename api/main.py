import sys
import os
import traceback
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import get_db, create_tables, DATABASE_URL
from models import Product as ProductModel, Order as OrderModel, User as UserModel
from schemas import Product, Order, OrderCreate, User, UserCreate, UserLogin
from auth import get_password_hash, verify_password, create_access_token

_cloudinary_error = None
try:
    from cloudinary_config import upload_image
except Exception as e:
    _cloudinary_error = str(e)
    def upload_image(_f):
        raise HTTPException(status_code=500, detail=f"Image upload not configured: {_cloudinary_error}")

_mailer_error = None
try:
    from mailer import send_order_notification
except Exception as e:
    _mailer_error = str(e)
    def send_order_notification(_o):
        pass

# Create DB tables before the app starts serving
try:
    create_tables()
    _db_ready = True
    _db_error = None
except Exception as e:
    _db_ready = False
    _db_error = str(e)

app = FastAPI(title="Hope Epicure API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hope Epicure API is running"}


@app.get("/health")
def health():
    """Diagnostic endpoint — shows exactly what is or isn't working."""
    import sqlite3, jwt as _jwt
    checks = {
        "db_url": DATABASE_URL,
        "db_ready": _db_ready,
        "db_error": _db_error,
        "cloudinary_error": _cloudinary_error,
        "mailer_error": _mailer_error,
        "python": sys.version,
        "jwt_version": _jwt.__version__,
    }
    try:
        db_path = DATABASE_URL.replace("sqlite:///", "")
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
        checks["tables"] = [r[0] for r in cur.fetchall()]
        conn.close()
    except Exception as e:
        checks["sqlite_test_error"] = str(e)
    return checks


# ── Products ──────────────────────────────────────────────────────────────────

@app.get("/products", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).all()


@app.post("/products", response_model=Product)
async def create_product(
    name: str = Form(...),
    price: float = Form(...),
    flavor: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        image_url = upload_image(image.file)
        new_product = ProductModel(
            name=name, price=price, flavor=flavor,
            description=description, image_url=image_url,
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.patch("/products/{product_id}", response_model=Product)
def update_availability(product_id: int, available: bool, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.is_available = available
    db.commit()
    db.refresh(product)
    return product


@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}


# ── Auth ──────────────────────────────────────────────────────────────────────

@app.post("/auth/signup", response_model=User)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = get_password_hash(user.password)
        new_user = UserModel(email=user.email, hashed_password=hashed_password, is_admin=False)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Signup error: {traceback.format_exc()}")


@app.post("/auth/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token(data={"sub": db_user.email})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "email": db_user.email,
            "is_admin": db_user.is_admin,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login error: {traceback.format_exc()}")


@app.post("/auth/make-admin")
def make_admin(email: str, admin_secret: str, db: Session = Depends(get_db)):
    expected = os.getenv("ADMIN_SECRET", "")
    if not expected or admin_secret != expected:
        raise HTTPException(status_code=403, detail="Invalid admin secret")
    db_user = db.query(UserModel).filter(UserModel.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.is_admin = True
    db.commit()
    return {"message": f"{email} is now an admin"}


# ── Orders ────────────────────────────────────────────────────────────────────

@app.post("/orders", response_model=Order)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    try:
        new_order = OrderModel(**order.model_dump())
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    try:
        send_order_notification(new_order)
    except Exception:
        pass

    return new_order


# Vercel handler
handler = app
