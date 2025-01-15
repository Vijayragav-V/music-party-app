import React, { useState } from 'react';
import { searchVideos } from '../services/api';

const Home = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchVideos(query);
      setVideos(results);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  /*const addToQueue = (videoId) => {
    const storedQueue = JSON.parse(localStorage.getItem('videoQueue')) || [];
    storedQueue.push(videoId);
    localStorage.setItem('videoQueue', JSON.stringify(storedQueue));
    alert('Video added to queue!');
  };*/

  return (
    <div>
      <h1>Search Videos</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for videos"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {videos.map((video) => (
          <li key={video.videoId}>
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
