import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Episode from './Episode';
import AddEpisode from './CRUD/Episode/AddEpisode'; 

function ShowDetail() {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id: showId } = useParams();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetch(`https://tvshowtracker20231020124800.azurewebsites.net/api/Shows/GetShow/${showId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        fetch(`https://tvshowtracker20231020124800.azurewebsites.net/api/Episodes/GetAllEpisodes/${showId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        })
          .then((response) => response.json())
          .then((episodesData) => {
            setEpisodes(episodesData);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching episodes:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [showId, authToken]);

  const handleEpisodeAdded = (newEpisode) => {
    setEpisodes([...episodes, newEpisode]);
  };




  return (
    <div className="showList">
      <h2>Show Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : show ? (
        <div>
          <h3>{show.title}</h3>
          <p>Description: {show.description}</p>
        </div>
      ) : (
        <p>Show not found</p>
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
