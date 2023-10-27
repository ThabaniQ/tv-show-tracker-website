import React from "react";
const authToken = localStorage.getItem('authToken');

function UpdateEpisode({ episode, showId, onUpdate }) { // Fix the function name to onUpdate
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://tvshowtracker20231020124800.azurewebsites.net/api/Episodes/UpdateEpisode/${episode.id}/${showId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        watched: !episode.watched,
      }),
    })
      .then((response) => {
        if (response.ok) {
          onUpdate(episode.id); // Use the onUpdate function
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
