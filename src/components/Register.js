import React, { useState } from 'react';

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
      const response = await fetch('https://tvshowtracker20231020124800.azurewebsites.net/api/identity/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRegistration),
      });

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
    <div>
      <h2>Sign up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Register;
