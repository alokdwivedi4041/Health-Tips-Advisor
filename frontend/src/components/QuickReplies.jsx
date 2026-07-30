function QuickReplies({ sendQuestion }) {
  const replies = [
    "Tips for better sleep",
    "Healthy diet ideas",
    "How to reduce stress?",
    "Workout tips",
    "How much water should I drink?",
    "Foods rich in protein",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
        width: "100%",
      }}
    >
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => sendQuestion(reply)}
          style={{
            padding: "10px 18px",
            borderRadius: "25px",
            border: "1px solid #1976d2",
            background: "white",
            color: "#1976d2",
            cursor: "pointer",
            fontSize: "15px",
            whiteSpace: "nowrap",
            transition: "0.2s",
          }}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}

export default QuickReplies;