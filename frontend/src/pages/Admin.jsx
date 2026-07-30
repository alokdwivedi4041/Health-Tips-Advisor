import { useEffect, useState } from "react";
import api from "../services/api";

const cardStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
  textAlign: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
  minHeight: "170px",
};

function Admin() {
  const [stats, setStats] = useState({});
  const [topics, setTopics] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);

      const topicsRes = await api.get("/admin/topics");
      setTopics(topicsRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#f4f6f9",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          background: "#1976d2",
          color: "white",
          padding: "20px 30px",
          borderRadius: "15px",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(22px,4vw,30px)",
            lineHeight: "1.3",
          }}
        >
          🩺 Health Tip Advisor Admin Dashboard
        </h1>

        <button
          onClick={fetchStats}
          style={{
            padding: "12px 20px",
            background: "#1565c0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%",
            maxWidth: "230px",
          }}
        >
          🔄 Refresh Dashboard
        </button>
      </div>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Users */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#1976d2" }}>👤 Total Users</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.total_users ?? 0}
          </h1>
        </div>

        {/* Sessions */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#388e3c" }}>💬 Total Sessions</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.total_sessions ?? 0}
          </h1>
        </div>

        {/* Messages */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#f57c00" }}>📝 Total Messages</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.total_messages ?? 0}
          </h1>
        </div>

        {/* Positive Feedback */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#2e7d32" }}>👍 Positive Feedback</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.positive_feedback ?? 0}
          </h1>
        </div>

        {/* Negative Feedback */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#d32f2f" }}>👎 Negative Feedback</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.negative_feedback ?? 0}
          </h1>
        </div>

        {/* Average Rating */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3 style={{ color: "#ff9800" }}>⭐ Average Rating</h3>

          <h1
            style={{
              fontSize: "clamp(30px,6vw,42px)",
              marginTop: "15px",
            }}
          >
            {stats.average_rating ?? 0}%
          </h1>
        </div>
      </div>

      {/* Most Asked Questions */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            color: "#1976d2",
            marginBottom: "20px",
            fontSize: "clamp(22px,4vw,28px)",
          }}
        >
          📋 Most Asked Questions
        </h2>

        {topics.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          <ol
            style={{
              paddingLeft: "20px",
              margin: 0,
            }}
          >
            {topics.map((topic, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  background: "#f7f9fc",
                  padding: "12px",
                  borderRadius: "8px",
                  wordBreak: "break-word",
                }}
              >
                <strong>{topic.question}</strong>

                <br />

                Asked <strong>{topic.count}</strong>{" "}
                {topic.count === 1 ? "time" : "times"}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Admin;