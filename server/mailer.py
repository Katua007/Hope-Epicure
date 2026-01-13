# backend/mailer.py
import os
from mailjet_rest import Client
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('MJ_APIKEY_PUBLIC')
API_SECRET = os.getenv('MJ_APIKEY_PRIVATE')
HOPE_EMAIL = "hope@example.com" # Replace with Hope's actual email

def send_order_notification(order_details):
    mailjet = Client(auth=(API_KEY, API_SECRET), version='v3.1')
    data = {
      'Messages': [{
        "From": {"Email": "noreply@hopeepicure.com", "Name": "Hope Epicure Bot"},
        "To": [{"Email": HOPE_EMAIL, "Name": "Hope"}],
        "Subject": f"🎂 New Order from {order_details['customer_name']}!",
        "TextPart": f"New Order: {order_details['quantity']}x {order_details['product_name']} ({order_details['flavor']})"
      }]
    }
    return mailjet.send.create(data=data)