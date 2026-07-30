from sqlalchemy import Column,Integer,String,ForeignKey,Text,DateTime
from sqlalchemy.sql import func
from database import Base

class Message(Base):

    __tablename__="messages"

    id=Column(Integer,primary_key=True,index=True)

    session_id=Column(Integer,ForeignKey("sessions.id"))

    sender=Column(String)

    content=Column(Text)

    timestamp=Column(DateTime(timezone=True),server_default=func.now())