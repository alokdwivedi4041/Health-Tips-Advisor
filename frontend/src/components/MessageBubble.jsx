import FeedbackButtons from "./FeedbackButtons";

function MessageBubble({
  sender,
  content,
 messageId,
  timestamp,
}) {
  const isUser = sender === "user";

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "20px",
        alignItems: "flex-end",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          background: isUser ? "#1976d2" : "#f1f5f9",
          color: isUser ? "#ffffff" : "#222222",
          padding: "14px 18px",
          borderRadius: "18px",
          maxWidth: "70%",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          lineHeight: "1.6",
          wordBreak: "break-word",
          transition: "all 0.25s ease",
          cursor: "default",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontSize: "20px" }}>
            {isUser ? "🙂" : "🩺"}
          </span>

          <span>{isUser ? "You" : ""}</span>
        </div>

        {/* Message */}
        <p
          style={{
            margin: "8px 0",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          {content}
        </p>

        {/* Timestamp */}
        <p
          style={{
            fontSize: "11px",
            color: isUser ? "#e3f2fd" : "#777",
            textAlign: "right",
            marginTop: "8px",
            marginBottom: "0",
          }}
        >
          {formattedTime}
        </p>

        {/* Feedback Buttons (Bot only) */}
        {!isUser && (
          <div style={{ marginTop: "10px" }}>
            <FeedbackButtons messageId={messageId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;