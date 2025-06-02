import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userId');

  const handleSignOut = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    localStorage.clear();
    navigate('/');
    window.location.reload(); // Ensure navbar updates
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
