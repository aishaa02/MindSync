// components/History.jsx
import React, { useEffect, useState } from 'react';
import './history.css';

const History = () => {
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [lieHistory, setLieHistory] = useState([]);
  const [seizureHistory, setSeizureHistory] = useState([]);
  const userId = localStorage.getItem('userId'); // or however you store it

  useEffect(() => {
    fetch(`http://localhost:8081/api/emotion/user/${userId}`)
      .then(res => res.json())
      .then(setEmotionHistory);

    fetch(`http://localhost:8081/api/lie/user/${userId}`)
      .then(res => res.json())
      .then(setLieHistory);

    fetch(`http://localhost:8081/api/seizure/user/${userId}`)
      .then(res => res.json())
      .then(setSeizureHistory);
  }, [userId]);

  return (
    <div className="history-container">
      <h1>📊 Your EEG Analysis History</h1>

      <div className="history-section">
        <h2>🎭 Emotion Detection</h2>
        {emotionHistory.map((item, index) => (
          <div className="history-card" key={index}>
            <p><strong>Emotion:</strong> {item.emotion}</p>
            <p><strong>Confidence:</strong> {item.confidence}</p>
            <p><strong>File:</strong> {item.fileName || 'N/A'}</p>
            <p><strong>Time:</strong> {item.timestamp}</p>
          </div>
        ))}
      </div>

      <div className="history-section">
        <h2>❗ Lie Detection</h2>
        {lieHistory.map((item, index) => (
          <div className="history-card" key={index}>
            <p><strong>Lie Detected:</strong> {item.lieDetected ? 'Yes' : 'No'}</p>
            <p><strong>Confidence:</strong> {item.confidence}</p>
            <p><strong>Time:</strong> {item.timestamp}</p>
          </div>
        ))}
      </div>

      <div className="history-section">
        <h2>⚡ Seizure Detection</h2>
        {seizureHistory.map((item, index) => (
          <div className="history-card" key={index}>
            <p><strong>Seizure:</strong> {item.seizureDetected ? 'Yes' : 'No'}</p>
            <p><strong>File:</strong> {item.fileName}</p>
            <p><strong>Time:</strong> {item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
