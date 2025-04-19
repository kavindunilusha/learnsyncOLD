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
    navigate(`/update/${user.id}`);
  };

  if (!user) {
    return <p className="loading">Loading user data...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 User Profile</h2>

      <div className="profile-card">
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button className="update-btn" onClick={goToUpdateProfile}>
          ✏️ Update Profile
        </button>
      </div>

      {/* Inline CSS */}
      <style>{`
        .profile-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .profile-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .profile-card {
          background: #f9f9f9;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .profile-card p {
          margin-bottom: 10px;
          font-size: 16px;
          color: #555;
        }

        .update-btn {
          margin-top: 20px;
          padding: 10px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
        }

        .update-btn:hover {
          background-color: #0056b3;
        }

        .loading {
          text-align: center;
          font-style: italic;
          color: #777;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
