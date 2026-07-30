# 🩺 Health Tip Advisor – AI Powered Health Tips Advisor

Health Tip Advisor is an AI-powered healthcare chatbot that provides users with general health guidance and wellness tips using AI. It includes secure JWT authentication, persistent chat history, quick reply suggestions, a feedback system, and an admin dashboard for monitoring application statistics.

> **Disclaimer:** This application provides general health information only. It does **not** replace professional medical advice, diagnosis, or treatment.

---

# 🚀 Features

- 🔐 JWT Authentication
-  AI Chatbot (Groq/OpenAI)
- ❤️ Personalized Health Tips
- 💬 Persistent Chat History
- ⚡ Quick Reply Suggestions
- 👍👎 Feedback System
- 📊 Admin Dashboard
- 📱 Responsive Design
- ⌨️ Enter Key Support
- 🕒 Typing Indicator
- 📂 Multiple Chat Sessions
- 🔄 Session Management
- 📈 Dashboard Analytics

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Axios
- React Router DOM

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Groq API / OpenAI API

---

# 📁 Project Structure

```text
Health-Tip-Advisor
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   │
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/Health-Tip-Advisor.git
```

```bash
cd Health-Tip-Advisor
```

---

# Backend Setup

Move to backend folder

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install required packages

```bash
pip install -r requirements.txt
```

Run the FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run React application

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DATABASE_URL=postgresql://postgres:password@localhost/health_tip_advisor

JWT_SECRET_KEY=your_secret_key

JWT_ALGORITHM=HS256

GROQ_API_KEY=your_groq_api_key

OPENAI_API_KEY=your_openai_api_key
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | User login |

---

## Chat

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /session | Create chat session |
| GET | /sessions | List all sessions |
| POST | /chat | Chat with AI |
| GET | /history/{session_id} | Load chat history |

---

## Feedback

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /feedback | Submit feedback |

---

## Admin Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /admin/stats | Dashboard statistics |
| GET | /admin/topics | Most common questions |

---

# Application Workflow

1. Register a new account
2. Login using JWT authentication
3. Create a new chat session
4. Ask health-related questions
5. Receive AI-generated responses
6. View previous chat sessions
7. Give positive or negative feedback
8. Monitor usage from the Admin Dashboard

---

# Screenshots

# 📸 Screenshots

## Login
![Login](screenshots/login.png)

## Register
![Register](screenshots/register.png)

## Chat
![Chat](screenshots/chat.png)

## Quick Replies
![Quick Replies](screenshots/quick-replies.png)

## Feedback System
![Feedback](screenshots/feedback.png)

## Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

---

# Future Improvements

- 🎤 Voice Assistant
- 📄 PDF Medical Report Analysis
- 🖼 Image Upload Support
- 🌙 Dark Mode
- 🌐 Multi-language Support
- 📧 Email Verification
- 🔑 Forgot Password
- 📤 Export Chat as PDF
- 🔔 Push Notifications
- 📊 Advanced Analytics

---

# Security

- JWT Authentication
- Password Hashing
- Protected API Routes
- SQLAlchemy ORM
- Secure Token Validation
- Environment Variables
- PostgreSQL Database Security

---

# Testing Checklist

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Create Chat Session
- ✅ AI Chat Responses
- ✅ Chat History
- ✅ Multiple Sessions
- ✅ Quick Replies
- ✅ Feedback System
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Error Handling

---

# Disclaimer

This project is intended for educational and demonstration purposes.

The AI assistant provides only general health information and wellness tips. It is **not** a licensed medical professional and must not be used as a replacement for professional healthcare advice.

Always consult a qualified doctor for diagnosis and treatment.

---

# Author

**ALOK DWIVEDI**



**Health Tip Advisor – AI Powered Health Tips Advisor**


Developed using React, FastAPI, PostgreSQL, SQLAlchemy, JWT Authentication, and Groq AI.
---

# License

This project is developed for educational purposes only.

© 2026 ALOK DWIVEDI. All rights reserved.