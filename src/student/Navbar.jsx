import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollingUp, setScrollingUp] = useState(false); // Track scroll direction

  // Detect scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // Scrolling up
        setScrollingUp(true);
      } else {
        // Scrolling down
        setScrollingUp(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchQuery(''); // Clear search query when opening
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`); // Navigate to SearchResults with search query
  };

  return (
    <div>
      {/* Top Section (Reminders & Profile) */}
      <div className="top-bar">
        <Link to="/reminders" className={`reminders ${location.pathname === '/reminders' ? 'active' : ''}`}>
          <FaBell />
          <span>Reminders</span>
        </Link>
        <Link to="/profile" className={`profile ${location.pathname === '/profile' ? 'active' : ''}`}>
          <span>NAME - ROLL Num</span>
          <FaUserCircle />
        </Link>
      </div>

      <div className="logo-container">
        <img src={logo} alt="LMS Logo" className="lms-logo" />
      </div>

      {/* Navbar */}
      <nav className="navbar-container">
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/badges" className={`nav-link ${location.pathname === '/badges' ? 'active' : ''}`}>Badges</Link>
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

      {/* Content under Navbar */}
      <div className={`content-under-navbar ${scrollingUp ? 'hidden' : ''}`}>
        {/* Your content (e.g., Reminders Section) */}
        <div className="reminders-section">
          {/* Reminders content */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
