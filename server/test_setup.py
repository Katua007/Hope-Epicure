#!/usr/bin/env python3
"""
Test script to verify Hope Epicure backend setup
"""
import os
import sys
from dotenv import load_dotenv

def check_env_vars():
    """Check if all required environment variables are set"""
    load_dotenv()
    
    required_vars = [
        'CLOUDINARY_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
        'MJ_APIKEY_PUBLIC',
        'MJ_APIKEY_PRIVATE'
    ]
    
    missing = []
    for var in required_vars:
        if not os.getenv(var):
            missing.append(var)
    
    if missing:
        print("❌ Missing environment variables:")
        for var in missing:
            print(f"   - {var}")
        return False
    
    print("✅ All environment variables are set")
    return True

def check_dependencies():
    """Check if all required packages are installed"""
    required_packages = [
        'fastapi',
        'sqlalchemy',
        'cloudinary',
        'mailjet_rest',
        'passlib',
        'python-jose',
        'uvicorn'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing.append(package)
    
    if missing:
        print("❌ Missing packages:")
        for package in missing:
            print(f"   - {package}")
        print("\nRun: pip install -r requirements.txt")
        return False
    
    print("✅ All required packages are installed")
    return True

def check_database():
    """Check if database can be created"""
    try:
        from database import engine, Base
        from models import Product, Order, User
        
        Base.metadata.create_all(bind=engine)
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def main():
    print("🎂 Hope Epicure Backend Setup Check\n")
    
    checks = [
        ("Environment Variables", check_env_vars),
        ("Python Dependencies", check_dependencies),
        ("Database Connection", check_database)
    ]
    
    results = []
    for name, check_func in checks:
        print(f"\nChecking {name}...")
        results.append(check_func())
    
    print("\n" + "="*50)
    if all(results):
        print("✅ All checks passed! You're ready to start the server.")
        print("\nRun: uvicorn main:app --reload")
        sys.exit(0)
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
