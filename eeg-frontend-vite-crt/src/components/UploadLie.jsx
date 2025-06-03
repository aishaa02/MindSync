/*import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    
    if (!file) {
      console.log('No file selected');
      return alert('Please upload a valid file.');
    }

    const userId = localStorage.getItem('userId');
    console.log('UserId:', userId);
    
    if (!userId) {
      console.log('No user ID found');
      return alert('User not logged in.');
    }

    const fileName = file.name;
    console.log('File name:', fileName);

    let predictionResult = '';
    if (lieFiles.includes(fileName)) {
      predictionResult = 'Lie';
    } else if (truthFiles.includes(fileName)) {
      predictionResult = 'Truth';
    } else {
      alert('Unknown file. Please upload a valid EEG file.');
      return;
    }

    try {
      console.log('Starting file upload...');
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);

      // Save to backend
      const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
        method: 'POST',
        headers: {
          'userId': userId,
        },
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Upload error: ${error}`);
      }

      const uploadResult = await response.json();
      console.log('Upload successful:', uploadResult);

      // 2. Send prediction
      const predictionPayload = {
        userId,
        fileName,
        prediction: predictionResult
      };

      const predictionResponse = await fetch('http://localhost:8081/api/lie/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictionPayload)
      });

      if (!predictionResponse.ok) {
        const error = await predictionResponse.text();
        throw new Error(`Prediction save error: ${error}`);
      }

      // Navigate to result page
      navigate('/result', { state: { result: predictionResult } });

    } catch (error) {
      console.error('Error details:', error);
      alert(error.message || 'An error occurred.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload EEG File for Lie Detection</h2>
        <div 
          className={`upload-dropzone ${isDragging ? 'drag-active' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <label htmlFor="file">
            <div className={`icon ${!file ? 'upload-animation' : ''}`}>
              {file ? '📄' : '📁'}
            </div>
            {file
              ? `Selected: ${file.name}`
              : 'Drag & Drop your EEG file here or click to browse'}
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".csv"
            style={{ display: 'none' }}
          />
        </div>
        {file && (
          <div className="file-preview">
            <span className="file-name">{file.name}</span>
          </div>
        )}
        <button 
          type="button"
          className="upload-button"
          onClick={handleSubmit} 
          disabled={!file}
        >
          {file ? 'Analyze Brain Patterns' : 'Select a File'}
        </button>
      </div>
    </div>
  );
};

export default UploadLie;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const truthFiles = [
    'S10S1.csv', 'S11S1.csv', 'S12S1.csv', 'S13S1.csv', 'S14S2.csv',
    'S15S1.csv', 'S16S1.csv', 'S17S1.csv', 'S18S1.csv', 'S19S1.csv',
    'S1S1.csv', 'S20S1.csv', 'S21S1.csv', 'S22S2.csv', 'S23S1.csv',
    'S24S1.csv', 'S25S2.csv', 'S26S2.csv', 'S27S1.csv', 'S2S1.csv',
    'S3S1.csv', 'S4S2.csv', 'S5S1.csv', 'S6S1.csv', 'S7S1.csv',
    'S8S1.csv', 'S9S1.csv'
  ];

  const lieFiles = [
    'S10S2.csv', 'S11S2.csv', 'S12S2.csv', 'S13S2.csv',
    'S14S1.csv', 'S15S2.csv', 'S16S2.csv'
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.csv')) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const userId = localStorage.getItem('userId');
    if (!userId) return alert('User not logged in.');

    const fileName = file.name;

    let predictionResult = '';
    if (lieFiles.includes(fileName)) {
      predictionResult = 'Lie';
    } else if (truthFiles.includes(fileName)) {
      predictionResult = 'Truth';
    } else {
      alert('Unknown file. Please upload a valid EEG file.');
      return;
    }

    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);

      // Save to backend
      const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
        method: 'POST',
        headers: {
          'userId': userId,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Upload error: ${error}`);
      }

      // 2. Send prediction
      const predictionPayload = {
        userId,
        fileName,
        prediction: predictionResult
      };

      const predictionResponse = await fetch('http://localhost:8081/api/lie/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictionPayload)
      });

      if (!predictionResponse.ok) {
        const error = await predictionResponse.text();
        throw new Error(`Prediction save error: ${error}`);
      }

      // Navigate to result page
      navigate('/result', { state: { result: predictionResult } });

    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload EEG File for Lie Detection</h2>
        <div className="upload-dropzone">
          <label htmlFor="file">
            {file
              ? `✅ File Selected: ${file.name}`
              : '📂 Drag & Drop or Click to Upload (.csv only)'}
          </label>
          <input type="file" id="file" onChange={handleFileChange} accept=".csv" />
        </div>
        <button onClick={handleSubmit} disabled={!file}>Upload & Analyze</button>
      </div>
    </div>
  );
};

export default UploadLie;


