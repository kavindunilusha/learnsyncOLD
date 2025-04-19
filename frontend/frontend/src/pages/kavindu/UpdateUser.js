import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams(); // get user ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch user data on load
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users`) // or `/api/users/${id}` if available
      .then((res) => {
        const user = res.data.find((u) => u.id === id); // pick user by ID
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
        // Optionally save to localStorage again
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Update failed");
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✏️ Update User</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateUser;
