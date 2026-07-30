from dotenv import load_dotenv

load_dotenv()

import os

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

security = HTTPBearer()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

print("DEPENDENCIES SECRET_KEY:", repr(SECRET_KEY))
print("DEPENDENCIES ALGORITHM:", ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    print("========== GET_CURRENT_USER ==========")
    print("Received Token:", token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("Decoded Payload:", payload)

        username = payload.get("sub")

        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return username

    except JWTError as e:
        print("JWT ERROR:", repr(e))
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )