from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, chat, feedback, admin

app = FastAPI(
    title="Health Tip Advisor API",
    description="""
## AI Powered Health Tips Advisor



### Features
- 🔐 JWT Authentication
- 💬 AI Health Chat
- 📂 Chat Sessions
- 📜 Chat History
- 👍👎 Feedback System
- 📊 Admin Dashboard
- 📈 Analytics

> This application provides general health information only and is not a substitute for professional medical advice.
""",
    version="1.0.0",
    contact={
        "name": "ALOK DWIVEDI",
        "email": "alokdwivedi43407@gmail.com",
    },
    license_info={
        "name": "Educational Project",
    },
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(feedback.router)
app.include_router(admin.router)


@app.get("/", tags=["Home"])
def home():
    return {
        "application": "Health Tip Advisor",
        "version": "1.0.0",
        "status": "Running",
        "message": "Health Tip Advisor Backend is running successfully."
    }