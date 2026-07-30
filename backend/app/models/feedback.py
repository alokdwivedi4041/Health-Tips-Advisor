from sqlalchemy import Column,Integer,String,ForeignKey,DateTime
from sqlalchemy.sql import func
from database import Base

class Feedback(Base):

    __tablename__="feedback"

    id=Column(Integer,primary_key=True,index=True)

    message_id=Column(Integer,ForeignKey("messages.id"))

    rating=Column(String)

    created_at=Column(DateTime(timezone=True),server_default=func.now())