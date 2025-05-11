import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import './Navbar.css';

import Home from './Home';
import Courses from './Courses';
import Dashboard from './Dashboard';
import Assignments from './Assignments';
import Announcements from './Announcements';
import Help from './Help';
import CourseDetails from './CourseDetails';
import Profile from './profile';
export default function FacultyNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/faculty/search?q=${searchQuery}`);
  };

  return (
    <div>
      <div className="top-bar">
        <Link to="/faculty/announcements" className={`reminders ${location.pathname === '/faculty/announcements' ? 'active' : ''}`}>
          <FaBell />
          <span>Announcements</span>
        </Link>
        <Link to="/faculty/profile" className={`profile ${location.pathname === '/faculty/profile' ? 'active' : ''}`}>
          <span>Faculty Name</span>
          <FaUserCircle />
        </Link>
      </div>

      <div className="logo-container">
        <img src={logo} alt="LMS Logo" className="lms-logo" />
      </div>

      <nav className="navbar-container">
        <div className="nav-links">
          <Link to="/faculty/home" className={`nav-link ${location.pathname === '/faculty/home' ? 'active' : ''}`}>Home</Link>
          <Link to="/faculty/courses" className={`nav-link ${location.pathname === '/faculty/courses' ? 'active' : ''}`}>Courses</Link>
          <Link to="/faculty/dashboard" className={`nav-link ${location.pathname === '/faculty/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/faculty/assignments" className={`nav-link ${location.pathname === '/faculty/assignments' ? 'active' : ''}`}>Assignments</Link>
          <Link to="/faculty/announcements" className={`nav-link ${location.pathname === '/faculty/announcements' ? 'active' : ''}`}>Announcements</Link>
          <Link to="/faculty/help" className={`nav-link ${location.pathname === '/faculty/help' ? 'active' : ''}`}>Help</Link>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`search-input ${isSearchVisible ? 'active' : ''}`}
              placeholder="Search courses"
              onBlur={() => setIsSearchVisible(false)}
            />
            <FaSearch className="search-icon" onClick={toggleSearch} />
          </form>
        </div>
      </nav>

      <Routes>
        <Route path="/faculty/home" element={<Home />} />
        <Route path="/faculty/courses" element={<Courses />} />
        <Route path="/faculty/dashboard" element={<Dashboard />} />
        <Route path="/faculty/assignments" element={<Assignments />} />
        <Route path="/faculty/announcements" element={<Announcements />} />
        <Route path="/faculty/help" element={<Help />} />
        <Route path="/faculty/course/:id" element={<CourseDetails />} />
        <Route path="/faculty/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
