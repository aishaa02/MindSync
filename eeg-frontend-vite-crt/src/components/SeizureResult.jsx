import React from "react";
import { useLocation } from "react-router-dom";
import "./SeizureResult.css";

const doctorContact = {
  name: "Dr. A. Neuro",
  phone: "+91-9876543210",
  email: "dr.neuro@hospital.com",
};

const SeizureResult = () => {
  const location = useLocation();

  // Extract seizureDetected from location.state safely
  // Default to null if not provided
  const seizureDetected =
    location.state && typeof location.state.result === "boolean"
      ? location.state.result
      : null;

  return (
    <div className="result-container">
      {seizureDetected === null ? (
        <div className="waiting">
          <h2>Awaiting Results...</h2>
        </div>
      ) : seizureDetected === false ? (
        <div className="healthy">
          <h1>🎉 No Seizure Detected!</h1>
          <p className="healthy-msg">
            You are <span className="highlight">healthy</span>!<br />
            Keep up the good work and take care of your brain 🧠✨
          </p>
        </div>
      ) : (
        <div className="seizure-alert">
          <h1>⚠ Seizure Detected</h1>
          <p>
            Please consult a neurologist as soon as possible.<br />
            <b>Recommended Doctor:</b>
          </p>
          <div className="doctor-card">
            <p><b>{doctorContact.name}</b></p>
            <p>📞 {doctorContact.phone}</p>
            <p>✉ {doctorContact.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeizureResult;
