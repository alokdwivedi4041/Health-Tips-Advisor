from fastapi import APIRouter,Depends,HTTPException

from sqlalchemy.orm import Session

from database import get_db

from app.models.user import User

from app.schemas.auth import UserRegister,UserLogin

from app.utils.auth import hash_password,verify_password,create_token

router=APIRouter(tags=["Authentication"])


@router.post("/register")
def register(user:UserRegister,db:Session=Depends(get_db)):

    existing=db.query(User).filter(User.username==user.username).first()

    if existing:

        raise HTTPException(status_code=400,detail="Username already exists")

    new_user=User(
        username=user.username,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {"message":"Registration successful"}


@router.post("/login")
def login(user:UserLogin,db:Session=Depends(get_db)):

    db_user=db.query(User).filter(User.username==user.username).first()

    if not db_user:

        raise HTTPException(status_code=401,detail="Invalid credentials")

    if not verify_password(user.password,db_user.password_hash):

        raise HTTPException(status_code=401,detail="Invalid credentials")

    token=create_token({"sub":db_user.username})

    return{
        "access_token":token,
        "token_type":"bearer"
    }