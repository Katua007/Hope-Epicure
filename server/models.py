# backend/models.py
from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    flavor = Column(String)
    image_url = Column(String)
    is_available = Column(Boolean, default=True)

# Add this to your existing models.py
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    customer_email = Column(String)
    product_name = Column(String)
    flavor = Column(String)
    quantity = Column(Integer)
    status = Column(String, default="Pending") # Pending, Completed, Cancelled