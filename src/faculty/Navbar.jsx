import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logo.jpg';

const FacultyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setScrollingUp(window.scrollY < lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/announcements" className={`reminders ${location.pathname === '/announcements' ? 'active' : ''}`}>
          <FaBell />
          <span>Announcements</span>
        </Link>
        <Link to="/profile" className={`profile ${location.pathname === '/profile' ? 'active' : ''}`}>
          <span>Faculty Name</span>
          <FaUserCircle />
        </Link>
      </div>

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="LMS Logo" className="lms-logo" />
      </div>

      {/* Navbar */}
      <nav className="navbar-container">
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/assignments" className={`nav-link ${location.pathname === '/assignments' ? 'active' : ''}`}>Assignments</Link>
          {/* <Link to="/forum" className={`nav-link ${location.pathname === '/forum' ? 'active' : ''}`}>Discussion Forum</Link> */}
          <Link to="/announcements" className={`nav-link ${location.pathname === '/announcements' ? 'active' : ''}`}>Announcements</Link>
          <Link to="/help" className={`nav-link ${location.pathname === '/help' ? 'active' : ''}`}>Help</Link>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`search-input ${isSearchVisible ? 'active' : ''}`}
              placeholder="Search courses"
            />
            <FaSearch className="search-icon" onClick={toggleSearch} />
          </form>
        </div>
      </nav>

      {/* Optional scroll-related content */}
      <div className={`content-under-navbar ${scrollingUp ? 'hidden' : ''}`}>
        {/* Add content here if needed */}
      </div>
    </div>
  );
};

export default FacultyNavbar;
