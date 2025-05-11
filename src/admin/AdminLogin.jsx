import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ uid: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { uid, password } = credentials;

    // Simulated authentication logic for admin
    if (uid === "admin123" && password === "adminpass") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      window.dispatchEvent(new Event("storage")); // Notify listeners
      navigate("/admin/home"); // Navigate to the admin's home page
    } else {
      alert("Invalid UID or Password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="uid"
            placeholder="Enter UID"
            value={credentials.uid}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="lost-password">
          <a href="/lost-password">Lost your password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
