import React, { useState } from 'react';
import './Style/Login.css';
import { apiService, apiUrl } from './Services/Services';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userRegistration = {
      email: email,
      password: password,
      username: username,
    };

    try {
      const response = await apiService.post(`${apiUrl}/api/identity/register`, userRegistration); 

      if (response.ok) {
        setError('Registration successful.');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Sign up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="buttonLogin" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
