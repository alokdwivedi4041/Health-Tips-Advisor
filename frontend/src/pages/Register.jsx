import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/register", {
        username,
        password,
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.detail);
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#fff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginBottom: "5px",
          }}
        >
          🩺 Health Tip Advisor
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Create your account
        </p>

        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Username
        </label>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "14px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;