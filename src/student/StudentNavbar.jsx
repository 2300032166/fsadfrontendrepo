import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logo.jpg';

import Home from './Home';
import Courses from './Courses'; // Courses page
import Dashboard from './Dashboard';
import Badges from './Badges';
import Help from './Help';
import Reminders from './Reminders';
import Profile from './Profile';
import FSAD from './FSAD';  // Individual course
import OS from './OS';      // Individual course
import ENG from './ENG';    // Individual course
import DAA from './DAA';    // Individual course
import QuizPage from './QuizPage';
import AssignmentUpload from './AssignmentUpload';
import AcademicRecords from './AcademicRecords';
import CourseGrades from './CourseGrades';
import SearchResults from './SearchResults';

export default function StudentNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    setSearchQuery(''); // Reset search query when toggling visibility
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/student/search?q=${searchQuery}`);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="top-bar">
        <Link to="/student/reminders" className={`reminders ${location.pathname === '/student/reminders' ? 'active' : ''}`}>
          <FaBell />
          <span>Reminders</span>
        </Link>
        <Link to="/student/profile" className={`profile ${location.pathname === '/student/profile' ? 'active' : ''}`}>
          <span>NAME - ROLL Num</span>
          <FaUserCircle />
        </Link>
      </div>

      <div className="logo-container">
        <img src={logo} alt="LMS Logo" className="lms-logo" />
      </div>

      {/* NavBar */}
      <nav className="navbar-container">
        <div className="nav-links">
          <Link to="/student/home" className={`nav-link ${location.pathname === '/student/home' ? 'active' : ''}`}>Home</Link>
          <Link to="/student/courses" className={`nav-link ${location.pathname === '/student/courses' ? 'active' : ''}`}>Courses</Link>
          <Link to="/student/dashboard" className={`nav-link ${location.pathname === '/student/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/student/badges" className={`nav-link ${location.pathname === '/student/badges' ? 'active' : ''}`}>Badges</Link>
          <Link to="/student/help" className={`nav-link ${location.pathname === '/student/help' ? 'active' : ''}`}>Help</Link>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`search-input ${isSearchVisible ? 'active' : ''}`}
              placeholder="Search courses"
              onBlur={() => setIsSearchVisible(false)}  // Close the search input when focus is lost
            />
            <FaSearch className="search-icon" onClick={toggleSearch} />
          </form>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/courses" element={<Courses />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/student/badges" element={<Badges />} />
        <Route path="/student/help" element={<Help />} />
        <Route path="/student/reminders" element={<Reminders />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/academic-records" element={<AcademicRecords />} />
        <Route path="/student/course/fsad" element={<FSAD />} />
        <Route path="/student/course/os" element={<OS />} />
        <Route path="/student/course/eng" element={<ENG />} />
        <Route path="/student/course/daa" element={<DAA />} />
        <Route path="/student/quiz" element={<QuizPage />} />
        <Route path="/student/assignment-upload/:id" element={<AssignmentUpload />} />
        <Route path="/student/coursegrades/:courseId" element={<CourseGrades />} />
        <Route path="/student/search" element={<SearchResults />} />
      </Routes>
    </div>
  );
}
