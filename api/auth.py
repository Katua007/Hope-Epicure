import os
import hashlib
import secrets
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_HOPE_KEY")
ALGORITHM = "HS256"


def get_password_hash(password: str) -> str:
    salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode(), 260_000)
    return f"pbkdf2$sha256${salt}${dk.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        _, algo, salt, dk_hex = hashed_password.split("$")
        dk = hashlib.pbkdf2_hmac(algo, plain_password.encode("utf-8"), salt.encode(), 260_000)
        return secrets.compare_digest(dk.hex(), dk_hex)
    except Exception:
        return False


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
