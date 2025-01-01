import React, { useState } from 'react';
import { searchVideos } from '../services/api';

const VideoSearch = () => {
  const [query, setQuery] = useState(''); // State to store the search query
  const [videos, setVideos] = useState([]); // State to store the search results

  const handleSearch = async () => {
    try {
      const results = await searchVideos(query); // Fetch search results from the server
      console.log('Search results:', results); // Print results to the console
      setVideos(results); // Update the state with the search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Video Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        placeholder="Search for videos"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.videoId}>
              <img src={video.thumbnail} alt={video.title} />
              <div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoSearch;
