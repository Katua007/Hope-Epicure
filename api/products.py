from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from .database import get_db
from .models import Product as ProductModel
from .schemas import Product
from .cloudinary_config import upload_image

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).all()

@router.post("/", response_model=Product)
async def create_product(
    name: str = Form(...),
    price: float = Form(...),
    flavor: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        image_url = upload_image(image.file)
        new_product = ProductModel(
            name=name, price=price, flavor=flavor,
            description=description, image_url=image_url
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{product_id}", response_model=Product)
def update_availability(product_id: int, available: bool, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.is_available = available
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}