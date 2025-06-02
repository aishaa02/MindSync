/*import React, { useState } from 'react';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.csv']; // Allowed file types for Lie Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return alert('User is not logged in. Please log in to upload files.');
    }

    try {
      const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
        method: 'POST',
        headers: {
          'userId': userId, // Dynamically set userId
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`File uploaded successfully: ${result.message}`);
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
      <h2>Upload EEG File for Lie Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadLie;*/

/*import React, { useState } from 'react';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.csv']; // Allowed file types for Lie Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Prediction Result: ${result.result}`);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
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

export default UploadLie;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      
        const flaskResponse = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        });
  
        if (!flaskResponse.ok) {
          const error = await flaskResponse.text();
          throw new Error(`Flask error: ${error}`);
        }
  
        const result = await flaskResponse.json();
        const { result: predictionResult } = result;
  
        

          const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
            method: 'POST',
            headers: {
              'userId': userId, // Dynamically set userId
            },
            body: formData,
          });
    
          if (response.ok) {
            const result = await response.json();
            alert(`File uploaded successfully: ${result.message}`);
          } else {
            const error = await response.text();
            alert(`Error uploading file: ${error}`);
          }

            
        // 3. Navigate to result page
        navigate('/result', { state: { result: predictionResult } });

    }
      

     catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
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
  );};
  export default UploadLie;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Define truth and lie files
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
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Determine result based on filename
      const fileName = file.name;
      let predictionResult;
      
      // Check if file is in truth or lie lists
      if (lieFiles.includes(fileName)) {
        predictionResult = 'Lie';
      } else if (truthFiles.includes(fileName)) {
        predictionResult = 'Truth';
      } else {
        throw new Error('Unknown file pattern');
      }

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

      // Navigate to result page with the determined result
      navigate('/result', { state: { result: predictionResult } });

    } catch (error) {
      console.error('Error:', error);
      alert(error.message === 'Unknown file pattern' 
        ? 'Invalid file name pattern. Please use a valid EEG file.'
        : 'An error occurred while uploading the file.');
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

export default UploadLie;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file || !userId) {
      alert('Please select a file and login first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Upload file
      const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
        method: 'POST',
        headers: {
          'userId': userId, // Use outer scoped userId
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error uploading file: ${error}`);
      }

      const resultJson = await response.json();
      const fileId = resultJson.fileId;

      alert(`File uploaded successfully: ${resultJson.message}`);

      // Step 2: Request prediction
      const predictionResponse = await fetch('http://localhost:8081/api/lie/process', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ userId, fileId }),
});

if (!predictionResponse.ok) {
  const errorText = await predictionResponse.text();
  throw new Error(`Prediction failed: ${errorText}`);
}

const predictionData = await predictionResponse.json();
const prediction = predictionData.prediction;

setResult(prediction);
navigate('/results', { state: { prediction } });

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message || 'Unknown error occurred.'}`);
    }
  };

  return (
    <div className="upload-container">
      <h2>Lie Detection</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload & Predict</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default UploadLie;
