import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './upload.css';

const UploadSeizure = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.edf', '.csv', '.parquet','.edf.seizures'];
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .edf, .csv, and .parquet files are allowed for Seizure Detection.');
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
      // STEP 1: Upload to Spring Boot which stores in Mongo
      const uploadResponse = await fetch('http://localhost:8081/myapp/api/eeg/seizure/upload', {
        method: 'POST',
        headers: {
          'userId': userId
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        return alert(`Error uploading file: ${errorText}`);
      }

      const uploadResult = await uploadResponse.json(); // { fileId: "...", fileName: "..." }

      console.log("Upload result:", uploadResult);


      // STEP 2: Trigger Seizure Detection (SpringBoot -> Flask)
      const processResponse = await fetch('http://localhost:8081/api/seizure/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName
        })
      });

      console.log("userId:", userId);
console.log("fileId:", uploadResult.fileId);
console.log("fileName:", uploadResult.fileName);


      if (!processResponse.ok) {
        const errorText = await processResponse.text();
        return alert(`Error during prediction: ${errorText}`);
      }

      const processResult = await processResponse.json(); // { seizureDetected: true/false }
      //alert(`Server Response:\nSeizure Detected: ${processResult.seizureDetected ? "Yes" : "No"}`);

    navigate('/seizure-result', {
     state: {
    result: processResult.seizureDetected,
    fileId: uploadResult.fileId,
    fileName: uploadResult.fileName,
    timestamp: new Date().toISOString()
  }
});

      

      //alert(`File uploaded and processed successfully.\nSeizure Detected: ${processResult.seizureDetected ? "Yes" : "No"}`);
      //alert(`Response from server:\n${JSON.stringify(processResult, null, 2)}`);

      setFile(null);

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during upload or prediction.');
    }
  };

  return (
    /*<div className="upload-container">
      <h2>Upload EEG File for Seizure Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".edf,.csv,.parquet" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>Upload</button>
      </form>
    </div>*/
    <div className="upload-container">
  <div className="upload-box">
    <h2>Upload EEG File for Seizure Detection</h2>
    <div className="upload-dropzone">
      <label htmlFor="file">
        {file
          ? `✅ File Selected: ${file.name}`
          : '📂 Drag & Drop or Click to Upload (.edf, .csv, .parquet)'}
      </label>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        accept=".edf,.csv,.parquet"
      />
    </div>
    <button onClick={handleSubmit} disabled={!file}>
      Upload & Analyze
    </button>
  </div>
</div>

  );
};

export default UploadSeizure;
