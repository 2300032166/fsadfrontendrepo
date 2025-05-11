import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaTasks, FaComments, FaUserGraduate, FaBullhorn, FaLifeRing } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>👩‍🏫 Faculty Dashboard</h1>
        <p>Welcome back! Here's a quick overview of your activities.</p>
      </header>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaBookOpen className="stat-icon" />
          <h2>6</h2>
          <p>Total Courses</p>
        </div>
        <div className="stat-card">
          <FaUserGraduate className="stat-icon" />
          <h2>282</h2>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <FaTasks className="stat-icon" />
          <h2>12</h2>
          <p>Pending Assignments</p>
        </div>
      </div>

      {/* Sections */}
      <div className="dashboard-grid">
        <Link to="/faculty/courses" className="dashboard-card">
          <FaBookOpen className="dashboard-icon" />
          <h3>My Courses</h3>
          <p>Manage your enrolled courses.</p>
        </Link>

        <Link to="/faculty/assignments" className="dashboard-card">
          <FaTasks className="dashboard-icon" />
          <h3>Assignments</h3>
          <p>Grade submissions and set deadlines.</p>
        </Link>

       

        <Link to="/faculty/announcements" className="dashboard-card">
          <FaBullhorn className="dashboard-icon" />
          <h3>Announcements</h3>
          <p>Post important updates.</p>
        </Link>

        <Link to="/faculty/help" className="dashboard-card">
          <FaLifeRing className="dashboard-icon" />
          <h3>Help & Support</h3>
          <p>Access LMS guidelines.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
