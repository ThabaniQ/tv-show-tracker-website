import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Series Tracker</h1>
      <h2>Your Ultimate TV Show Companion</h2>
      <p>Never miss a moment of your favorite shows. With Series Tracker, you can easily manage and keep track of all your series and episodes. Whether you want to add, delete, or update your shows, we've got you covered.</p>
      
      <div className="action-buttons">
        <Link to="/login" className="start-button">Sign in</Link>
        <Link to="/register" className="learn-more-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default Welcome;
