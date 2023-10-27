import React, { useState } from 'react';
import DeleteEpisode from './CRUD/Episode/DeleteEpisode';
import UpdateEpisode from './CRUD/Episode/UpdateEpisode';

function Episode({ episode, episodes, showId }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const episodeStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    backgroundColor: episode.watched ? '#d6d6d6' : '#f9f9f9',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  };

  let nextEpisodeInfo = null;

  if (episodes.length > 1) {
    const watchedEpisodes = episodes.filter((e) => e.watched);

    if (watchedEpisodes.length > 0) {
      const maxSeasonNumber = Math.max(...watchedEpisodes.map((e) => e.seasonNumber));
      const maxEpisodeNumber = Math.max(...watchedEpisodes.map((e) => e.episodeNumber));

      const nextEpisode = episodes.find(
        (e) => e.seasonNumber === maxSeasonNumber && e.episodeNumber === maxEpisodeNumber + 1
      );

      if (nextEpisode) {
        nextEpisodeInfo = `Next episode: Season ${nextEpisode.seasonNumber}, Episode ${nextEpisode.episodeNumber}`;
      }
    }
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  return (
    <div style={episodeStyle}>
      <h3>{episode.title}</h3>
      <p>Season: {episode.seasonNumber}</p>
      <p>Episode: {episode.episodeNumber}</p>
      <p>Watched: {episode.watched ? 'Yes' : 'No'}</p>
      <button className="buttonStyle" onClick={openDeleteModal}>
        Remove episode
      </button>
      <button className="buttonStyle" onClick={openUpdateModal}>
        Mark as viewed
      </button>
      {nextEpisodeInfo && <p>{nextEpisodeInfo}</p>}

      {isDeleteModalOpen && (
        <DeleteEpisode showId={showId} episode={episode} onDelete={closeDeleteModal} />
      )}
      {isUpdateModalOpen && (
        <UpdateEpisode showId={showId} episode={episode} onUpdate={closeUpdateModal} />
      )}
    </div>
  );
}

export default Episode;
