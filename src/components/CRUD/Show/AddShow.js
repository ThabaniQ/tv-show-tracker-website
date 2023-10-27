import React, { useState, useEffect } from 'react';
import Modal from '../Episode/Modal';
import PropTypes from 'prop-types';
import { apiService, apiUrl } from '../../Services/Services'; 

function AddShow({ onShowAdded, onClose, fromShowList }) {
  const [showData, setShowData] = useState({
    title: '',
    description: '',
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (fromShowList) {
      openDialog();
    }
  }, [fromShowList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShowData({ ...showData, [name]: value });
  };

  const authToken = localStorage.getItem('authToken');

  const handleSave = (e) => {
    e.preventDefault();
    
    const addShowUrl = `${apiUrl}/api/Shows/AddShows`;
    
    apiService
      .post(addShowUrl, authToken, showData)
      .then((newShow) => {
        onShowAdded(newShow);
        setShowData({
          title: '',
          description: '',
        });
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error adding show:', error);
      });
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    onClose();
  };

  return (
    <div>
      {fromShowList ? null : (
        <button onClick={openDialog}>Add Show</button>
      )}
      <Modal show={isDialogOpen} onClose={closeDialog}>
        <span className="close" onClick={closeDialog}>
          &times;
        </span>
        <h2>Add Show</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={showData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={showData.description}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}

AddShow.propTypes = {
  onShowAdded: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  fromShowList: PropTypes.bool.isRequired,
};

export default AddShow;
