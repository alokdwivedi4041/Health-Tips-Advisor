import "./TypingIndicator.css";

function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          background: "#f1f5f9",
          padding: "14px 18px",
          borderRadius: "18px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          maxWidth: "140px",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "20px" }}></span>
          <span></span>
        </div>

        {/* Animated Typing Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;