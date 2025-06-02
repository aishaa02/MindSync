import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './lieResult.css';

const LieResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  return (
    <div className="result-container">
      <h1>Lie Detection Result</h1>
      {result ? (
        <div className={`result-box ${result === 'Lie' ? 'lie' : 'truth'}`}>
          <p>{result === 'Lie' ? '🚨 Lie Detected!' : '✅ Truth Detected!'}</p>
        </div>
      ) : (
        <div className="error-box">
          <p>No result found. Please upload a file first.</p>
          <button onClick={() => navigate('/upload/lie')}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default LieResult;
