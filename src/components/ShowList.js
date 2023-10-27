import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEpisodeDialog from './CRUD/Episode/AddEpisode'; 
import DeleteShow from './CRUD/Show/DeleteShow';
import AddShow from './CRUD/Show/AddShow';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddEpisodeOpen, setAddEpisodeOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isDeleteShowOpen, setDeleteShowOpen] = useState(false);
  const [showToDelete, setShowToDelete] = useState(null);
  const [isAddShowOpen, setAddShowOpen] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetch('https://tvshowtracker20231020124800.azurewebsites.net/api/Shows/GetAllShows', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
      });
  }, [authToken]);

  const navigateToShowDetails = (showId) => {
    navigate(`/show/${showId}`);
  };

  const handleAddEpisodeClick = (show) => {
    setSelectedShow(show);
    setAddEpisodeOpen(true);
  };

  const handleEpisodeAdded = (newEpisode) => {
    setSelectedShow({
      ...selectedShow,
      episodes: [...selectedShow.episodes, newEpisode],
    });
  };

  const handleShowDeleted = (deletedShowId) => {
    setShows(shows.filter((show) => show.id !== deletedShowId));
  };

  const handleDeleteShowClick = (show) => {
    setShowToDelete(show);
    setDeleteShowOpen(true);
  };

  const handleAddShowClick = () => {
    setAddShowOpen(true);
  };

  const handleShowAdded = (newShow) => {
    setShows([...shows, newShow]);
    setAddShowOpen(false);
  };

  return (
    <div className='showList'>
      <h2 className='listHeader'>List of Shows</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button className='buttonStyle' 
          fromShowList={true}
          onClick={handleAddShowClick}>
            Add show
          </button>

          <ul>
            {shows.map((show) => (
              <li key={show.id}>
                <h3>{show.title}</h3>
                <p>{show.description}</p>
                <button className='buttonStyle' onClick={() => navigateToShowDetails(show.id)}>
                  View Details
                </button>
                <button onClick={() => handleAddEpisodeClick(show)}>Add Episode</button>
                <button className='buttonStyle' onClick={() => handleDeleteShowClick(show)}>
                  Delete Show
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isAddEpisodeOpen && (
        <AddEpisodeDialog
          showId={selectedShow.id} 
          onClose={() => setAddEpisodeOpen(false)}
          onEpisodeAdded={handleEpisodeAdded}
          fromShowList={true}
        />
      )}
      {isDeleteShowOpen && (
        <DeleteShow
          show={showToDelete}
          onDelete={handleShowDeleted}
          onClose={() => setDeleteShowOpen(false)}
          fromShowList={true}
        />
      )}
      {isAddShowOpen && (
        <AddShow 
        onClose={() => setAddShowOpen(false)} 
        onShowAdded={handleShowAdded}
         fromShowList={true} />
      )}
    </div>
  );
}

export default ShowList;
