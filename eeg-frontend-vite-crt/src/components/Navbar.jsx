import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // watch route changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));

  // Update isLoggedIn every time the route changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userId'));
  }, [location]);

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('userId');
    localStorage.removeItem('token'); // optional
    setIsLoggedIn(false);
    navigate('/home');
  };


  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About Us</Link>

      {!isLoggedIn ? (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/history" className="nav-link">History</Link>
          <a href="/" onClick={handleSignOut} className="nav-link">Sign Out</a>
        </>
      )}
    </nav>
  );
};

export default Navbar;
