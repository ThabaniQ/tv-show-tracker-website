import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const authToken = localStorage.getItem('authToken');

function DeleteEpisode({ episode, onDelete, showId, onClose, fromShowList }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (fromShowList) {
      openDialog();
    }
  }, [fromShowList]);

  const handleDelete = (e) => {
   
    fetch(`https://tvshowtracker20231020124800.azurewebsites.net/api/Episodes/DeleteEpisode/${episode.id}/${showId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          onDelete(episode.id);
          closeDialog();
        }
      })
      .catch((error) => {
        console.error('Error deleting episode:', error);
      });
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      {fromShowList && (
        <button onClick={handleDelete}>Delete episode</button>
      )}

      <Modal show={isDialogOpen} onClose={closeDialog}>
        <span className="close" onClick={closeDialog}>
          &times;
        </span>
        <form onSubmit={handleDelete}>
          <h2>Delete Episode</h2>
          <p>Are you sure you want to delete this episode: {episode.title}?</p>
          <button type="submit">Delete</button>
          <button onClick={closeDialog}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default DeleteEpisode;
