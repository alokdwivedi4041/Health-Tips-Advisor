import QuickReplies from "../components/QuickReplies";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";

function Chat() {
  const [sessionId, setSessionId] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ----------------------------
  // Logout
  // ----------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session_id");

    setSessionId(null);
    setSessionReady(false);

    navigate("/login");
  };

  // ----------------------------
  // Typing Delay
  // ----------------------------
  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ----------------------------
  // Fetch Sessions
  // ----------------------------
  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions(res.data);
    } catch (err) {
      console.error("Session List Error:", err);

      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("session_id");

        navigate("/login");
        return;
      }

      alert("Unable to load sessions.");
    }
  };

  // ----------------------------
  // Load History
  // ----------------------------
  const loadHistory = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/history/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessionId(id);
      localStorage.setItem("session_id", id);

      setMessages(res.data);
      setSessionReady(true);

      fetchSessions();
    } catch (err) {
      console.error("History Error:", err);

      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("session_id");

        navigate("/login");
        return;
      }

      alert("Unable to load chat history.");

      setSessionReady(false);
    }
  };

  // ----------------------------
  // New Chat
  // ----------------------------
  const handleNewChat = async () => {
    localStorage.removeItem("session_id");

    setMessages([]);
    setSessionId(null);
    setSessionReady(false);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newSession = res.data.session_id;

      setSessionId(newSession);

      localStorage.setItem(
        "session_id",
        newSession
      );

      setMessages([]);
      setSessionReady(true);

      fetchSessions();
    } catch (err) {
      console.error("New Chat Error:", err);

      alert("Unable to create a new chat.");
    }
  };

  // ----------------------------
  // Auto Scroll
  // ----------------------------
  useEffect(() => {
    if (chatEndRef.current){
    chatEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
  }, [messages]);

    // ----------------------------
  // Create or Load Session
  // ----------------------------
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const createOrLoadSession = async () => {
      const existingSession = localStorage.getItem("session_id");

      if (existingSession) {
        await loadHistory(existingSession);
        return;
      }

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/session",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newSession = res.data.session_id;

        setSessionId(newSession);
        localStorage.setItem("session_id", newSession);

        setMessages([]);
        setSessionReady(true);

        fetchSessions();
      } catch (err) {
        console.error("Create Session Error:", err);

        if (err.response?.status === 401) {
          alert("Your session has expired. Please login again.");

          localStorage.removeItem("token");
          localStorage.removeItem("session_id");

          navigate("/login");
          return;
        }

        alert("Unable to create chat session.");
        setSessionReady(false);
      }
    };

    createOrLoadSession();
  }, []);

  // ----------------------------
  // Send Message
  // ----------------------------
  const sendMessage = async (text = message) => {
    if (loading) return;

    if (!sessionReady) {
      alert("Session is still loading.");
      return;
    }

    if (!text.trim()) {
      alert("Please enter a message.");
      return;
    }

    if (!sessionId) {
      alert("Session is not ready yet.");
      return;
    }

    const currentMessage = text;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: currentMessage,
        timestamp: new Date().toISOString(),
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          session_id: sessionId,
          message: currentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await delay(600);

      setMessages((prev) => [
        ...prev,
        {
          id: res.data.message_id,
          sender: "bot",
          content: res.data.response,
          timestamp: res.data.timestamp,
        },
      ]);

      fetchSessions();
    } catch (err) {
      console.error("Chat Error:", err);

      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("session_id");

        navigate("/login");
        return;
      }

      let errorMessage =
        "⚠️ Unable to contact the server. Please try again.";

      if (err.response?.status === 500) {
        errorMessage =
          "⚠️ Internal server error. Please try again later.";
      } else if (err.code === "ERR_NETWORK") {
        errorMessage =
          "⚠️ Network error. Please check your internet connection.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: errorMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Enter Key
  // ----------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ----------------------------
  // Quick Replies
  // ----------------------------
  const sendQuickReply = (question) => {
    sendMessage(question);
  };

  // ----------------------------
  // Sidebar Session Select
  // ----------------------------
  const handleSelectSession = async (id) => {
    await loadHistory(id);
  };

    return (
    <div>
      <Navbar
        onLogout={handleLogout}
        onNewChat={handleNewChat}
      />

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 90px)",
          width: "100%",
          maxWidth: "1400px",
          margin: "15px auto",
          gap: "20px",
          padding: "0 15px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          sessions={sessions}
          currentSession={sessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          onLogout={handleLogout}
        />

        {/* Main Chat */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Chat Window */}
          <div
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "15px",
              background: "#fff",
              padding: "20px",
              overflowY: "auto",
              overflowX: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              marginBottom: "15px",
            }}
          >
            {messages.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#888",
                  marginTop: "100px",
                  fontSize: "18px",
                }}
              >
                👋 Start a conversation with Health Tip Advisor!
              </p>
            ) : (
              messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  sender={msg.sender}
                  content={msg.content}
                  messageId={msg.id}
                  timestamp={msg.timestamp}
                />
              ))
            )}

            {loading && <TypingIndicator />}

            <div ref={chatEndRef}></div>
          </div>

          {/* Quick Replies */}
          <QuickReplies
            sendQuestion={sendQuickReply}
          />

          

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "stretch",
              flexShrink: 0,
            }}
          >
            <textarea
              rows="3"
              placeholder="Type your health question..."
              disabled={loading}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                resize: "none",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />

              <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                minWidth: "120px",
                height: "52px",
                padding: "0 25px",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontSize: "16px",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;