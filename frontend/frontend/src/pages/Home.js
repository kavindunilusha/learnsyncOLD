import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to the Home Page</h2>
      <button onClick={goToLogin} style={{ marginRight: "1rem" }}>
        Login
      </button>
      <button onClick={goToSignup}>Sign Up</button>
    </div>
  );
};

export default Home;
