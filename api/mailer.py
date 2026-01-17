# backend/mailer.py
import os
from mailjet_rest import Client
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('MJ_APIKEY_PUBLIC')
API_SECRET = os.getenv('MJ_APIKEY_PRIVATE')
HOPE_EMAIL = os.getenv('HOPE_EMAIL', 'hope@example.com')

def send_order_notification(order_details):
    mailjet = Client(auth=(API_KEY, API_SECRET), version='v3.1')
    data = {
      'Messages': [{
        "From": {"Email": "noreply@hopeepicure.com", "Name": "Hope Epicure Bot"},
        "To": [{"Email": HOPE_EMAIL, "Name": "Hope"}],
        "Subject": f"🎂 New Order from {order_details['customer_name']}!",
        "TextPart": f"New Order: {order_details['quantity']}x {order_details['product_name']} ({order_details['flavor']})\nCustomer: {order_details['customer_name']} ({order_details['customer_email']})",
        "HTMLPart": f"<h3>New Order Received!</h3><p><strong>Product:</strong> {order_details['product_name']}</p><p><strong>Flavor:</strong> {order_details['flavor']}</p><p><strong>Quantity:</strong> {order_details['quantity']}</p><p><strong>Customer:</strong> {order_details['customer_name']}</p><p><strong>Email:</strong> {order_details['customer_email']}</p>"
      }]
    }
    return mailjet.send.create(data=data)