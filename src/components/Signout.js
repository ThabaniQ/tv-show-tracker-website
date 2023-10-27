import React from 'react';

function Signout() {
  localStorage.removeItem('authToken');
  window.location.reload();
  return (
    <div className="welcome-container">
      <h1>We're Sorry to See You Go</h1>
      <p>Your session has been successfully signed out. We hope to see you again soon!</p>
    </div>
  );
}

export default Signout;
