import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <motion.h1
        className="home-heading"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to MindSync
      </motion.h1>

      <motion.p
        className="home-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        AI-powered EEG analysis for emotion, seizure, and lie detection.
      </motion.p>

      <div className="home-boxes">
        
        <motion.div
          className="home-box"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>Already a User?</h2>
          <Link to="/login">Login</Link>
        </motion.div>

        
        <motion.div
          className="home-box"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h2>New Here?</h2>
          <Link to="/register">Register</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;



