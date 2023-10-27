import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Episode from './Episode';
import AddEpisode from './CRUD/Episode/AddEpisode'; 
import { apiService, apiUrl } from './Services/Services';
import { useNavigate } from 'react-router-dom';

function ShowDetail() {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id: showId } = useParams();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchShowAndEpisodes = async () => {
      try {
        const [showData, episodesData] = await Promise.all([
          apiService.get(`${apiUrl}/api/Shows/GetShow/${showId}`, authToken),
          apiService.get(`${apiUrl}/api/Episodes/GetAllEpisodes/${showId}`, authToken),
        ]);

        setShow(showData);
        setEpisodes(episodesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show and episodes:', error);
      }
    };

    fetchShowAndEpisodes();
  }, [showId, authToken]);

  const handleEpisodeAdded = (newEpisode) => {
    setEpisodes([...episodes, newEpisode]);
  };




  return (
    <div className="showList">
      <h2>List episodes</h2>
      <button onClick={() => navigate('/showlist')}>Back to Show List</button>
      {loading ? (
        <p>Loading...</p>
      ) : show ? (
        <div>
          <h3>{show.title}</h3>
          <p>Description: {show.description}</p>
        </div>
      ) : (
        <p>No episodes found</p>
      )}

      <AddEpisode showId={showId} onEpisodeAdded={handleEpisodeAdded} />

      {episodes.length !== 0 ? (
        <div>
          <h2>Episodes</h2>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <Episode episode={episode} episodes={episodes} showId={showId} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No episodes recorded for this show</p>
      )}

      
    </div>
  );
}

export default ShowDetail;
