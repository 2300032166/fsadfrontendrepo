import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LMSLogin.css';

const LMSLogin = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "student") {
      navigate("/student/login");
    } else if (selectedRole === "admin") {
      navigate("/admin/login");
    } else if (selectedRole === "faculty") {
      navigate("/faculty/login");
    }
  };

  return (
    <div className="lms-container">
      <div className="lms-content">
        <h1>Select Your Role</h1>
        <div className="login-cards">
          <div
            className="login-card"
            onClick={() => handleCardClick("student")}
          >
            <h2>Student</h2>
            <p>Access student resources</p>
          </div>
          <div
            className="login-card"
            onClick={() => handleCardClick("admin")}
          >
            <h2>Admin</h2>
            <p>Manage system settings</p>
          </div>
          <div
            className="login-card"
            onClick={() => handleCardClick("faculty")}
          >
            <h2>Faculty</h2>
            <p>Access faculty resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSLogin;
