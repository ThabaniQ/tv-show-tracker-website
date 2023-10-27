import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';
import { apiService, apiUrl } from './Services/Services'; 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userLogin = {
      email: email,
      password: password,
    };

    try {
      const response = await apiService.post(`${apiUrl}/api/Identity/login`, null, userLogin);

      if (response.token) {
        const token = response.token;
        localStorage.setItem('authToken', token);
        navigate('/showlist');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='buttonLogin' type="submit">Sign in</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
