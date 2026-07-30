import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from jose import jwt
from passlib.context import CryptContext

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"])

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

print("AUTH SECRET_KEY:", repr(SECRET_KEY))
print("AUTH ALGORITHM:", ALGORITHM)


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)


def create_token(data):
    expire = datetime.utcnow() + timedelta(hours=1)

    to_encode = data.copy()
    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("Generated Token:", token)

    print(
        "Immediate Decode:",
        jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    )

    return token