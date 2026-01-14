from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    flavor: str
    image_url: str
    is_available: bool = True

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: str
    product_name: str
    flavor: str
    quantity: int
    status: str = "Pending"

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str