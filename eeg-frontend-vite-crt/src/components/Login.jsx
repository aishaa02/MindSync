import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // adjust the path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ initialize the hook here

  const validateForm = () => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert('Password must be 8-15 characters long and include a capital letter, lowercase letter, number, and a special character.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.userId); // Save userId in local storage
        localStorage.setItem('token', data.token); // Save token if needed
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        const error = await response.text();
        alert(`Login failed: ${error}`);

      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleLogin();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
