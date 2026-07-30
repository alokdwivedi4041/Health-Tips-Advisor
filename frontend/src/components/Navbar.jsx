function Navbar({ onLogout, onNewChat }) {
  const buttonStyle = {
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "#1976d2",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#1976d2",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}>Health Tips Advisor</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={onNewChat}
          style={buttonStyle}
        >
          New Chat
        </button>

        <button
          onClick={onLogout}
          style={buttonStyle}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;