import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddUser from "./pages/kavindu/AddUser";
import UpdateUser from "./pages/kavindu/UpdateUser";
import LoginUser from "./pages/kavindu/LoginUser";
import UserProfile from "./pages/kavindu/UserProfile";
import Home from "./pages/HomePage/Home";
import MyLearning from "./pages/MyLearningPage/MyLearning";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AddUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-learning" element={<MyLearning />} />
      </Routes>
    </div>
  );
}

export default App;
