import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/users/login", credentials)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setMessage("✅ Login successful");
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Invalid credentials");
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔐 User Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Username</label>
        <input
          name="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p className="login-message">{message}</p>

      {/* Inline CSS styling */}
      <style>{`
        .login-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 30px;
          background: #f4f4f4;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          font-family: sans-serif;
        }
        .login-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .login-form label {
          margin-top: 10px;
          font-weight: 600;
        }
        .login-form input {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }
        .login-form button {
          margin-top: 20px;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .login-form button:hover {
          background-color: #0056b3;
        }
        .login-message {
          margin-top: 15px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LoginUser;
