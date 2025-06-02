import React from 'react';
import './about.css'; 

const About = () => {
  return (
    <div className="about-container">
      <br /><br />
      <h1>🧠 About MindSync</h1>

      <p>
        <strong>MindSync</strong> is an AI-powered platform that analyzes EEG signals to detect seizures, emotions, and deception in real-time. 
        By integrating <strong>React</strong>, <strong>Spring Boot</strong>, <strong>Flask</strong>, and <strong>MongoDB</strong>, the platform bridges 
        brain-computer interfaces with real-world applications in <strong>healthcare</strong> and <strong>security</strong>. 
        Our mission is to provide accessible, intelligent neuro-assistive tools aligned with global health and innovation goals.
      </p>

      <h2>🔍 What Is MindSync?</h2>
      <p>
        MindSync is a real-time lie detection system powered by artificial intelligence and brainwave analysis. By analyzing EEG signals collected during cognitive tasks, 
        our platform can differentiate between truthful and deceptive responses with a high degree of accuracy.
      </p>

      <h2>🧪 How It Works</h2>
      <ol>
        <li><strong>EEG Data Upload:</strong> Users upload EEG recordings in formats like <code>.csv</code>, <code>.edf</code>, and <code>.parquet</code>.</li>
        <li><strong>Signal Processing:</strong> Uses wavelet transform to extract key brain signal features.</li>
        <li><strong>ML Prediction:</strong> A pre-trained LDA model predicts truth or deception.</li>
        <li><strong>Interactive Results:</strong> Engaging UI shows results with animation and highlights.</li>
      </ol>

      <h2>🔧 Technologies Used</h2>
      <ul>
        <li><strong>Frontend:</strong> React.js, CSS3</li>
        <li><strong>Backend:</strong> Flask, Python</li>
        <li><strong>Middleware:</strong> Spring Boot</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>ML Libraries:</strong> Scikit-learn, PyWavelets</li>
      </ul>

      <h2>🎯 Project Objectives</h2>
      <ul>
        <li>Provide a real-time AI-based lie detection platform</li>
        <li>Interpret EEG signals visually and meaningfully</li>
        <li>Ensure easy-to-use and secure uploads</li>
        <li>Enable future expansion to emotion and seizure detection</li>
      </ul>

      <h2>🌍 Use Cases</h2>
      <ul>
        <li><strong>Forensics:</strong> Assist in truth verification during investigations</li>
        <li><strong>Neuroscience:</strong> Research into deception-related brain activity</li>
        <li><strong>Clinical:</strong> Aid in psychological assessments</li>
        <li><strong>Security:</strong> Use in high-stakes identity verification</li>
      </ul>

      <h2>👥 Meet the Team</h2>
      <p>
        This project was developed as part of an academic initiative under the guidance of <strong>Prof. Amey Muchandi</strong> 
         <strong>at KLE Technological University’s Dr. M. S. Sheshgiri College of Engineering and Technology, Belagavi</strong>.
      </p>

      <h2>🚀 Future Plans</h2>
      <ul>
        <li>Real-time EEG signal acquisition using devices like OpenBCI</li>
        <li>Enhance accuracy with deep learning models</li>
        <li>Dynamic feedback and personalized EEG insights</li>
        <li>Extend to other cognitive states like stress and focus</li>
      </ul>

      <blockquote>
        “<em>Code is the language of the future, and every line you write is a step toward it.</em>”
      </blockquote>
    </div>
  );
};

export default About;

