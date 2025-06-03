import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import the CSS we’ll create next

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { label: 'Emotion Detection', emoji: '🎭', route: '/upload/emotion' },
    { label: 'Seizure Detection', emoji: '⚡', route: '/upload/seizure' },
    { label: 'Lie Detection', emoji: '❗', route: '/upload/lie' },
    
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to MindSync Features</h1>
      <div className="dashboard-grid">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="feature-card"
            onClick={() => item.route !== '#' && navigate(item.route)}
          >
            <div className="emoji">{item.emoji}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
