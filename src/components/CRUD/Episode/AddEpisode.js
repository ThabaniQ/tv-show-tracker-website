import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { apiService, apiUrl } from '../../Services/Services'; 

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

    const authToken = localStorage.getItem('authToken');
    const url = `${apiUrl}/api/Episodes/AddEpisode/${showId}`; 
    episodeData.title='';
    
    apiService
      .post(url, authToken, episodeData)
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

AddEpisode.propTypes = {
  showId: PropTypes.string.isRequired,
  onEpisodeAdded: PropTypes.func.isRequired,
  fromShowList: PropTypes.bool.isRequired,
};

export default AddEpisode;
