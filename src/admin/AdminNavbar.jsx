import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpg"; 
import AdminHome from "./AdminHome";
import TeacherDetails from "./TeacherDetails";
import AdminDashboard from "./AdminDashboard";
import ViewAllStudents from "./ViewAllStudents";
import ViewAllFaculty from "./ViewAllFaculty";  
import ViewAllCourses from "./ViewAllCourses";  
import AdminRemainders from "./AdminRemainders";
import AdminSupport from "./AdminSupport";
import AdminReports from "./AdminReports";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminAssignments from "./AdminAssignments";
import AdminSettings from './AdminSettings';
import AdminCourses from "./AdminCourses";  
import AdminLogin from "./AdminLogin"; 
import "./CssFile.css"; // or admin.css, whichever you're using

export default function AdminNavBar() {
  return (
    <div>
      {/* Top Section (Reminders & Announcements) */}
      <div className="top-bar">
        <Link to="/admin/reminders" className="reminders">
          <FaBell />
          <span>AdminReminders</span>
        </Link>
        <Link to="/admin/announcements" className="announcements">
          <FaBell />
          <span>AdminAnnouncements</span>
        </Link>
      </div>

      <div className="logo-container">
        <img src={logo} alt="LMS Logo" className="lms-logo" />
      </div>

      {/* Navigation Bar */}
      <nav className="navbar-container">
        <div className="nav-links">
          <Link to="/admin/home" className="nav-link">Home</Link>
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/admin/assignments" className="nav-link">Assignments</Link>
          <Link to="/admin/courses" className="nav-link">Courses</Link> 
          <Link to="/admin/support" className="nav-link">Support</Link>
          <Link to="/admin/reports" className="nav-link">Reports</Link>
          {/* New Links for Faculty and Courses */}
          {/* Added link */}
        </div>
        <FaSearch className="search-icon" />
      </nav>

      {/* Routes for Admin */}
      <Routes>
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assignments" element={<AdminAssignments />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/support" element={<AdminSupport />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/reminders" element={<AdminRemainders />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/teacher/:id" element={<TeacherDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/ViewAllStudents" element={<ViewAllStudents />} />
        <Route path="/admin/ViewAllFaculty" element={<ViewAllFaculty />} /> {/* Added Route for ViewAllFaculty */}
        <Route path="/admin/ViewAllCourses" element={<ViewAllCourses />} /> {/* Added Route for ViewAllCourses */}
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </div>
  );
}
