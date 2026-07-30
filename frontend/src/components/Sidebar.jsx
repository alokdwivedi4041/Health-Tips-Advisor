function Sidebar({
  sessions,
  currentSession,
  onSelectSession,
  onNewChat,
  onLogout,
}) {
  return (
    <div
      style={{
        width: "260px",
        minWidth: "260px",
        height: "calc(100vh - 110px)",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "12px",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          margin: "0 0 20px 0",
          textAlign: "center",
        }}
      >
        🩺 Health Tips Advisor
      </h2>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#1976d2",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        + New Chat
      </button>

      {/* Session List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          marginBottom: "15px",
        }}
      >
        {sessions.length === 0 ? (
          <p style={{ color: "#cbd5e1" }}>
            No previous chats
          </p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              style={{
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  currentSession === session.id
                    ? "#1976d2"
                    : "#334155",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "6px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                💬 {session.title || `Chat #${session.id}`}
              </div>

              <small
                style={{
                  color: "#d1d5db",
                }}
              >
                {session.created_at
                  ? new Date(
                      session.created_at
                    ).toLocaleDateString()
                  : `Session #${session.id}`}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;