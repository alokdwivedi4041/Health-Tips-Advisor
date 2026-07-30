import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          username,
          password,
        }
      );

      // Store JWT token
      localStorage.setItem("token", response.data.access_token);

      alert("Login successful!");

      // Redirect to chat page
      navigate("/chat");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h1>Health Tip Advisor</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;