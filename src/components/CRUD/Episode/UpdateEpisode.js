import React from "react";
import { apiService, apiUrl } from '../../Services/Services'; // Import the apiService and apiUrl

function UpdateEpisode({ episode, showId, onUpdate }) {
  const handleUpdate = (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken'); 
    const updateUrl = `${apiUrl}/api/Episodes/UpdateEpisode/${episode.id}/${showId}`;

    apiService
      .put(updateUrl, authToken, {
        watched: !episode.watched,
      })
      .then((response) => {
        if (response.ok) {
          onUpdate(episode.id);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error updating episode:', error);
      });
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update Episode</button>
    </div>
  );
}

export default UpdateEpisode;
