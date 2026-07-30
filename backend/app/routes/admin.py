from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.models.user import User
from app.models.session import Session as ChatSession
from app.models.message import Message
from app.models.feedback import Feedback

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_sessions = db.query(ChatSession).count()
    total_messages = db.query(Message).count()

    positive_feedback = db.query(Feedback).filter(
        Feedback.rating == "positive"
    ).count()

    negative_feedback = db.query(Feedback).filter(
        Feedback.rating == "negative"
    ).count()
    total_feedback = positive_feedback + negative_feedback

    if total_feedback > 0:
        average_rating = round(
            (positive_feedback / total_feedback) * 100,
            2
        )
    else:
        average_rating = 0

    return {
        "total_users": total_users,
        "total_sessions": total_sessions,
        "total_messages": total_messages,
        "positive_feedback": positive_feedback,
        "negative_feedback": negative_feedback,
        "average_rating": average_rating,
    }
@router.get("/topics")
def get_topics(db: Session = Depends(get_db)):
    topics = (
        db.query(
            Message.content.label("question"),
            func.count(Message.id).label("count")
        )
        .filter(Message.sender == "user")
        .group_by(Message.content)
        .order_by(func.count(Message.id).desc())
        .limit(5)
        .all()
    )

    return [
        {
            "question": topic.question,
            "count": topic.count
        }
        for topic in topics
    ]