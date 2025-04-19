import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/users", form)
      .then((res) => {
        console.log(res.data);
        setMessage("✅ User created successfully");
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to create user");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Create Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>First Name</label>
        <input
          name="firstName"
          placeholder="Enter first name"
          value={form.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Last Name</label>
        <input
          name="lastName"
          placeholder="Enter last name"
          value={form.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Username</label>
        <input
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          ➕ Add User
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// ✅ Simple clean styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.2rem",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "1.5rem",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    color: "#0069d9",
  },
};

export default AddUser;
