from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.session import Session as ChatSession
from app.models.user import User
from app.models.message import Message
from app.schemas.chat import ChatRequest
from app.services.ai_service import ask_llm
from app.utils.dependencies import get_current_user

router = APIRouter(tags=["Chat"])


# ----------------------------------
# Create New Session
# ----------------------------------
@router.post("/session")
def create_session(
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user)
):
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    session = ChatSession(user_id=user.id)

    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "message": "Session created"
    }


# ----------------------------------
# Get All User Sessions
# ----------------------------------
@router.get("/sessions")
def get_sessions(
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user)
):
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    sessions = (
        db.query(ChatSession)
        .filter(ChatSession.user_id == user.id)
        .order_by(ChatSession.id.desc())
        .all()
    )

    result = []

    for session in sessions:

        first_message = (
            db.query(Message)
            .filter(
                Message.session_id == session.id,
                Message.sender == "user"
            )
            .order_by(Message.id.asc())
            .first()
        )

        if first_message:
            title = first_message.content

            if len(title) > 35:
                title = title[:35] + "..."
        else:
            title = "New Chat"

        result.append({
            "id": session.id,
            "title": title
        })

    return result


# ----------------------------------
# Chat
# ----------------------------------
@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user)
):

    # Save User Message
    user_message = Message(
        session_id=request.session_id,
        sender="user",
        content=request.message
    )

    db.add(user_message)
    db.commit()

    # AI Response
    ai_response = ask_llm(request.message)

    # Save Bot Message
    bot_message = Message(
        session_id=request.session_id,
        sender="bot",
        content=ai_response
    )

    db.add(bot_message)
    db.commit()
    db.refresh(bot_message)

    return {
        "response": ai_response,
        "message_id": bot_message.id,
        "timestamp": bot_message.timestamp
    }


# ----------------------------------
# Chat History
# ----------------------------------
@router.get("/history/{session_id}")
def get_history(
    session_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user)
):
    messages = (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.timestamp)
        .all()
    )

    history = []

    for msg in messages:
        history.append({
            "id": msg.id,
            "sender": msg.sender,
            "content": msg.content,
            "timestamp": msg.timestamp
        })

    return history