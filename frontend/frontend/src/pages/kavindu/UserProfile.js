import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const goToUpdateProfile = () => {
    // Navigate to update form with user ID
    navigate(`/update/${user.id}`);
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👤 User Profile</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={goToUpdateProfile} style={{ marginTop: "1rem" }}>
        ✏️ Update Profile
      </button>
    </div>
  );
};

export default UserProfile;
