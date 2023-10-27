import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';

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
      const response = await fetch('https://tvshowtracker20231020124800.azurewebsites.net/api/Identity/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('authToken', token);
        navigate('/showlist');
      } else {
        const errorData = await response.json();
        console.log(errorData.errors);
        setError(errorData.errors);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
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
        <button type="submit">Sign in</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
