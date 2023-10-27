import React, { useState, useEffect } from 'react';
import Modal from './Modal';

function AddEpisode({ showId, onEpisodeAdded, fromShowList }) {
  const [episodeData, setEpisodeData] = useState({
    seasonNumber: '',
    episodeNumber: '',
    watched: false,
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (fromShowList) {
      openDialog();
    }
  }, [fromShowList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData({ ...episodeData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const apiUrl = `https://tvshowtracker20231020124800.azurewebsites.net/api/Episodes/AddEpisode/${showId}`;
    const authToken = localStorage.getItem('authToken');

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(episodeData),
    })
      .then((response) => response.json())
      .then((data) => {
        onEpisodeAdded(data);
        closeDialog();
      })
      .catch((error) => {
        console.error('Error adding episode:', error);
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
        <button onClick={openDialog}>Add Episode</button>
      )}

      <Modal show={isDialogOpen} onClose={closeDialog}>
        <span className="close" onClick={closeDialog}>
          &times;
        </span>
        <h2>Add Episode</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Season Number:</label>
            <input
              type="text"
              name="seasonNumber"
              value={episodeData.seasonNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Episode Number:</label>
            <input
              type="text"
              name="episodeNumber"
              value={episodeData.episodeNumber}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}

export default AddEpisode;
