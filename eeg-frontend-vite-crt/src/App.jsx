import './index.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UploadEmotion from './components/UploadEmotion';
import UploadSeizure from './components/UploadSeizure';
import UploadLie from './components/UploadLie';
import LieResult from './components/LieResult';
import History from './components/History';
import SeizureResult from './components/SeizureResult';
import EmotionResult from './components/EmotionResult';


import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/upload/emotion" element={<UploadEmotion />} />
  <Route path="/upload/seizure" element={<UploadSeizure />} />
  <Route path="/upload/lie" element={<UploadLie />} />
  <Route path="/result" element={<LieResult />} />
  <Route path="/history" element={<History />} />
  <Route path="/seizure-result" element={<SeizureResult />} />
  <Route path="/emotion-result" element={<EmotionResult />} />

  <Route path="*" element={<Navigate to="/" />} />  {/* ✅ wildcard last */}
</Routes>
    </Router>
  );
}

export default App;