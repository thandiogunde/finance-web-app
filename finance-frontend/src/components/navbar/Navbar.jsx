// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = ({ isAdmin, isLoggedIn, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  
  // Close mobile nav when clicking outside or on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769 && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar-slider');
      const hamburger = document.querySelector('.hamburger');
      if (navbar && !navbar.contains(event.target) && !hamburger.contains(event.target)) {
        setMobileNavOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    if (mobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileNavOpen]);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setMobileNavOpen(false); // Close menu after search on mobile
    }
  };

  // Toggle mobile navigation
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // Close mobile navigation
  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <>
      {/* Header bar (always visible) */}
      <header className="header-bar">
        <div className="logo">
          <Link to={isAdmin ? "/admin" : "/"} onClick={closeMobileNav}>
            <img src={logo} alt="Fortuna Logo" />
          </Link>
        </div>

        {/* Desktop search form */}
        <form onSubmit={handleSearch} className="search-form desktop-search">
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
          />
        </form>

        {/* Desktop auth buttons */}
        <div className="desktop-auth">
          {isLoggedIn ? (
            <button className="btn logout-btn" onClick={onLogout}>Logout</button>
          ) : (
            <>
              <Link to="/register"><button className="btn register-btn">Register</button></Link>
              <Link to="/login"><button className="btn login-btn">Login</button></Link>
            </>
          )}
        </div>

        {/* Mobile hamburger menu button */}
        <button 
          className="hamburger" 
          onClick={toggleMobileNav} 
          aria-label="Toggle navigation menu"
          aria-expanded={mobileNavOpen}
        >
          ☰
        </button>
      </header>

      {/* Desktop navbar */}
      <nav className="desktop-navbar">
        <ul>
          {isAdmin ? (
            <>
              <li><NavLink to="/admin">Dashboard</NavLink></li>
              <li><NavLink to="/learning">Learning</NavLink></li>
              <li><NavLink to="/daily-tips">Daily Tips</NavLink></li>
              <li><NavLink to="/manage-money">Manage Money</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/learning">Learning</NavLink></li>
              <li><NavLink to="/daily-tips">Daily Tips</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile navbar slider */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            className="navbar-slider"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="navbar-header">
              <button 
                className="close-btn" 
                onClick={closeMobileNav}
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            {/* Mobile search form */}
            <form onSubmit={handleSearch} className="search-form-mobile">
              <input
                className="search"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
            </form>

            {/* Mobile nav links */}
            <ul className="mobile-nav-links">
              {isAdmin ? (
                <>
                  <li><NavLink to="/admin" onClick={closeMobileNav}>Dashboard</NavLink></li>
                  <li><NavLink to="/learning" onClick={closeMobileNav}>Learning</NavLink></li>
                  <li><NavLink to="/daily-tips" onClick={closeMobileNav}>Daily Tips</NavLink></li>
                  <li><NavLink to="/manage-money" onClick={closeMobileNav}>Manage Money</NavLink></li>
                  <li><NavLink to="/about" onClick={closeMobileNav}>About Us</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" onClick={closeMobileNav}>Home</NavLink></li>
                  <li><NavLink to="/learning" onClick={closeMobileNav}>Learning</NavLink></li>
                  <li><NavLink to="/daily-tips" onClick={closeMobileNav}>Daily Tips</NavLink></li>
                  <li><NavLink to="/about" onClick={closeMobileNav}>About Us</NavLink></li>
                </>
              )}
            </ul>

            {/* Mobile auth */}
            <div className="mobile-auth">
              {isLoggedIn ? (
                <button className="btn logout-btn" onClick={() => { onLogout(); closeMobileNav(); }}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" onClick={closeMobileNav}>
                    <button className="btn register-btn">Register</button>
                  </Link>
                  <Link to="/login" onClick={closeMobileNav}>
                    <button className="btn login-btn">Login</button>
                  </Link>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;