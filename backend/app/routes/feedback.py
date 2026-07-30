from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackRequest

router = APIRouter(tags=["Feedback"])


@router.post("/feedback")
def submit_feedback(
    request: FeedbackRequest,
    db: Session = Depends(get_db)
):
    feedback = Feedback(
        message_id=request.message_id,
        rating=request.rating
    )

    db.add(feedback)
    db.commit()

    return {
        "message": "Feedback submitted successfully"
    }