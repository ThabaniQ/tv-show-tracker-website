import React, { useEffect, useState } from 'react';
import Modal from '../Episode/Modal';

const authToken = localStorage.getItem('authToken');

function DeleteShow({ show, onDelete, onClose, fromShowList }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (fromShowList) {
      openDialog();
    }
  }, [fromShowList]);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://tvshowtracker20231020124800.azurewebsites.net/api/Shows/DeleteShow/${show.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          onDelete(show.id);
          closeDialog();
        }
      })
      .catch((error) => {
        console.error('Error deleting show:', error);
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
      {fromShowList ? null : (
        <button onClick={handleDelete}>Delete Show</button>
      )}

      <Modal show={isDialogOpen} onClose={closeDialog}>
        <span className="close" onClick={closeDialog}>
          &times;
        </span>
        <form onSubmit={handleDelete}>
          <h2>Delete Show</h2>
          <p>Are you sure you want to delete this show: {show.title}?</p>
          <button type="submit">Delete</button>
          <button onClick={closeDialog}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default DeleteShow;
