import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# You'll get these credentials from your Cloudinary Dashboard
cloudinary.config( 
  cloud_name = os.getenv("CLOUDINARY_NAME"), 
  api_key = os.getenv("CLOUDINARY_API_KEY"), 
  api_secret = os.getenv("CLOUDINARY_API_SECRET") 
)

def upload_image(file):
    result = cloudinary.uploader.upload(file)
    return result.get("url") # This returns the public web link