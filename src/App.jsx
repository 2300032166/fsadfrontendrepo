import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import LMSLogin from "./student/LMSLogin"; 
import StudentLogin from "./student/StudentLogin"; 
import AdminLogin from "./admin/AdminLogin"; 
import FacultyLogin from "./faculty/FacultyLogin"; 
import StudentNavbar from "./student/StudentNavbar"; 
import AdminNavbar from "./admin/AdminNavbar"; 
import FacultyNavbar from "./faculty/FacultyNavbar"; 
import StudentHome from "./student/Home"; 
import AdminHome from "./admin/AdminHome"; 
import FacultyHome from "./faculty/Home";  // Import FacultyHome

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (loggedIn) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setRole(""); // Reset role if not logged in
    }
  }, [location]);

  // Don't show navbar on login pages
  const showNavbar = !['/', '/student/login', '/admin/login', '/faculty/login'].includes(location.pathname) && isLoggedIn;

  // Define navbar height to avoid content overlap
  const navbarHeight = 60; // Adjust this value based on your navbar height

  return (
    <div>
      {/* Show the correct navbar based on user role */}
      {showNavbar && role === "student" && <StudentNavbar />}
      {showNavbar && role === "admin" && <AdminNavbar />}
      {showNavbar && role === "faculty" && <FacultyNavbar />}  {/* Render FacultyNavbar */}

      {/* Add margin-top to prevent content from going under the navbar */}
      <div style={{ marginTop: showNavbar ? navbarHeight : 0 }}>
        <Routes>
          <Route path="/" element={<LMSLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />  {/* Add FacultyLogin route */}
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/faculty/home" element={<FacultyHome />} />  {/* Add FacultyHome route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
