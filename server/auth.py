from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "SUPER_SECRET_HOPE_KEY" # In production, use an env variable
ALGORITHM = "HS256"

def hash_password(password: str):
    # Truncate password to 72 bytes for bcrypt compatibility
    password_bytes = password.encode('utf-8')[:72]
    return pwd_context.hash(password_bytes.decode('utf-8', errors='ignore'))

def verify_password(plain_password, hashed_password):
    # Truncate password to 72 bytes for bcrypt compatibility
    password_bytes = plain_password.encode('utf-8')[:72]
    return pwd_context.verify(password_bytes.decode('utf-8', errors='ignore'), hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)