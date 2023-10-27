import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { apiService, apiUrl } from '../../Services/Services';

function DeleteEpisode({ episode, onDelete, showId, fromShowList }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (fromShowList) {
      openDialog();
    }
  }, [fromShowList]);

  const handleDelete = (e) => {
    e.preventDefault()
    const deleteUrl = `${apiUrl}/api/Episodes/DeleteEpisode/${episode.id}/${showId}`;

    apiService
      .del(deleteUrl, authToken)
      .then((response) => {
        if (response.ok) {
          onDelete(episode.id);
          closeDialog();
        }
      })
      .catch((error) => {
        console.error('Error deleting episode:', error);
      });
  }

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
       {fromShowList ? null : (
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

DeleteEpisode.propTypes = {
  episode: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  fromShowList: PropTypes.bool.isRequired,
};

export default DeleteEpisode;
