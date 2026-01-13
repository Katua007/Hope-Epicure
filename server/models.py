# backend/models.py
from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: float
    flavor: str
    image_url: str
    is_available: bool = True