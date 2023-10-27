const apiUrl = 'https://tvshowtracker20231020124800.azurewebsites.net';

const get = (url, authToken) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => response.json());
};

const post = (url, authToken, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const del = (url, authToken) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};

export const apiService = {
  get,
  post,
  del,
};

export default apiUrl;



// useEffect(() => {
//     const fetchShowAndEpisodes = async () => {
//       try {
//         const [showData, episodesData] = await Promise.all([
//           apiService.get(`${apiUrl}/api/Shows/GetShow/${showId}`, authToken),
//           apiService.get(`${apiUrl}/api/Episodes/GetAllEpisodes/${showId}`, authToken),
//         ]);

//         setShow(showData);
//         setEpisodes(episodesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching show and episodes:', error);
//       }
//     };

//     fetchShowAndEpisodes();
//   }, [showId, authToken]);