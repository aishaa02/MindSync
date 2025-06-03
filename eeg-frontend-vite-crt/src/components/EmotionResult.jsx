import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EmotionResult.css';

const EmotionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const emotion = location.state?.emotion || 'Unknown';

  // Map emotion to emoji
  const emojiMap = {
    happy: '😄',
    sad: '😢',
    fear: '😨',
    neutral: '😐',
    unknown: '❓'
  };

  const displayEmotion = emotion.toLowerCase();
  const emoji = emojiMap[displayEmotion] || emojiMap.unknown;

  return (
    <div className="result-container">
      <h2>Emotion Detection Result</h2>
      <p className="emotion-text">
        Detected Emotion: <strong>{emoji} {emotion.charAt(0).toUpperCase() + emotion.slice(1)}</strong>
      </p>
      <button onClick={() => navigate(-1)}>Upload Another File</button>
    </div>
  );
};

export default EmotionResult;
