import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './upload.css';
import './upload.css';

// Hardcoded file lists for each emotion
const emotionFiles = {
  neutral: [
    "1_20160518.mat", "2_20150915.mat", "3_20150919.mat", "4_20151111.mat",
    "5_20160406.mat", "6_20150507.mat", "7_20150715.mat", "8_20151103.mat",
    "9_20151028.mat", "10_20151021.mat", "11_20150921.mat", "12_20150804.mat",
    "13_20151125.mat", "14_20151208.mat", "15_20150514.mat"
  ],
  sad: [
    "1_20161125.mat", "2_20150920.mat", "3_20151018.mat", "4_20151118.mat",
    "5_20160413.mat", "6_20150511.mat", "7_20150717.mat", "8_20151110.mat",
    "9_20151119.mat"
  ],
  fear: [
    "10_20151023.mat", "11_20151011.mat", "12_20150807.mat", "13_20161130.mat",
    "14_20151215.mat", "15_20150527.mat", "1_20161126.mat", "2_20151012.mat",
    "3_20151101.mat", "4_20151123.mat"
  ],
  happy: [
    "5_20160420.mat", "6_20150512.mat", "7_20150721.mat", "8_20151117.mat",
    "9_20151209.mat", "10_20151014.mat", "11_20150916.mat", "12_20150725.mat",
    "13_20151115.mat", "14_20151205.mat", "15_20150508.mat"
  ]
};

/*const UploadEmotion = () => {
  const [file, setFile] = useState(null);
  const [detectedEmotion, setDetectedEmotion] = useState('');

  // Find the emotion for the uploaded filename
  const getEmotionForFile = (filename) => {
    for (const [emotion, files] of Object.entries(emotionFiles)) {
      if (files.includes(filename)) {
        return emotion;
      }
    }
    return 'Unknown'; // If file not found in any list
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.mat', '.bdf'];
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
      setDetectedEmotion(''); // reset detected emotion on new upload
    } else {
      alert('Only .mat and .bdf files are allowed for Emotion Detection.');
      setFile(null);
      setDetectedEmotion('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      return alert('User is not logged in. Please log in to upload files.');
    }

    try {
      const response = await fetch('http://localhost:8081/myapp/api/eeg/emotion/upload', {
        method: 'POST',
        headers: {
          'userId': userId,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`File uploaded successfully: ${result.message}`);

        // Detect emotion based on filename
        const emotion = getEmotionForFile(file.name);
        setDetectedEmotion(emotion);

        setFile(null);
      } else {
        const error = await response.text();
        alert(`Error uploading file: ${error}`);
        setDetectedEmotion('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
      setDetectedEmotion('');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload EEG File for Emotion Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".mat,.bdf"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>

      
      {detectedEmotion && (
        <div className="detected-emotion">
          <h3>Detected Emotion:</h3>
          <p>{detectedEmotion.charAt(0).toUpperCase() + detectedEmotion.slice(1)}</p>
        </div>
      )}
    </div>
  );
};

export default UploadEmotion;*/

const UploadEmotion = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();  // initialize navigate

  const getEmotionForFile = (filename) => {
    for (const [emotion, files] of Object.entries(emotionFiles)) {
      if (files.includes(filename)) {
        return emotion;
      }
    }
    return 'Unknown';
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.mat', '.bdf'];
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .mat and .bdf files are allowed for Emotion Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      return alert('User is not logged in. Please log in to upload files.');
    }

    try {
      const response = await fetch('http://localhost:8081/myapp/api/eeg/emotion/upload', {
        method: 'POST',
        headers: {
          'userId': userId,
        },
        body: formData,
      });

      if (response.ok) {
        await response.json();

        // Detect emotion based on filename
        

      const fileName = file.name;
      const emotion = getEmotionForFile(fileName);
      const timestamp = new Date().toISOString();

      // Save result to MongoDB via Spring Boot
      await fetch('http://localhost:8081/api/emotion/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, fileName,  emotion, timestamp })

      });
        

        // Navigate to result page and pass emotion in state
        navigate('/emotion-result', { state: { emotion } });

      } else {
        const error = await response.text();
        alert(`Error uploading file: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload EEG File for Emotion Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".mat,.bdf"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadEmotion;
