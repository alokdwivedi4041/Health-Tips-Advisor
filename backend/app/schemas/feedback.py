from pydantic import BaseModel

class FeedbackRequest(BaseModel):
    message_id: int
    rating: str