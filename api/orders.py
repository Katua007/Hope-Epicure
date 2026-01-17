from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import Order
from .schemas import OrderCreate
from .mailer import send_order_notification

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/")
def place_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    try:
        new_order = Order(**order_data.dict())
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        try:
            send_order_notification(order_data.dict())
        except Exception as e:
            print(f"Email failed: {e}")

        return {"status": "success", "message": "Order placed!", "order_id": new_order.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to place order")