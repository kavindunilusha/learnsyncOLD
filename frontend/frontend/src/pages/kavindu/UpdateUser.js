import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users`)
      .then((res) => {
        const user = res.data.find((u) => u.id === id);
        if (user) {
          setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
          });
        }
      })
      .catch((err) => console.error("Failed to load user", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/users/${id}`, form)
      .then((res) => {
        setMessage("✅ User updated successfully");
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Update failed!!");
      });
  };

  return (
    <div className="update-container">
      <h2 className="update-title">✏️ Update Profile</h2>

      <form onSubmit={handleUpdate} className="update-form">
        <label>First Name</label>
        <input
          name="firstName"
          placeholder="Enter first name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          name="lastName"
          placeholder="Enter last name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label>Username</label>
        <input
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit">💾 Save Changes</button>
      </form>

      {message && <p className="update-message">{message}</p>}

      <style>{`
        .update-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 30px;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        .update-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .update-form {
          display: flex;
          flex-direction: column;
        }

        .update-form label {
          margin-top: 12px;
          font-weight: bold;
          color: #444;
        }

        .update-form input {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
        }

        .update-form button {
          margin-top: 20px;
          padding: 10px;
          font-size: 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .update-form button:hover {
          background-color: #218838;
        }

        .update-message {
          margin-top: 15px;
          text-align: center;
          font-weight: bold;
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default UpdateUser;
