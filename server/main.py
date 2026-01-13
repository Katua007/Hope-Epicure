# backend/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine, get_db

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

