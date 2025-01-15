import React, { useState } from 'react';
import { searchVideos } from '../services/api';
import { FaSearch } from 'react-icons/fa';
import Video from './VideoCard';

const VideoSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return; // Avoid empty search
    try {
      const results = await searchVideos(query);
      console.log('Search results:', results);
      setVideos(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for videos"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => handleSearch(query)}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FaSearch />
        </button>
      </div>
      <div className="mt-4">
        <div className="mt-4 h-48 overflow-y-auto">  {/* Set a fixed height and allow scrolling */}
            <ul className="space-y-1">  {/* Space between items vertically */}
            {videos.map((video) => (
                <li key={video.videoId} className="flex justify-center flex-col">
                <Video id={video.videoId} src={video.thumbnail} title={video.title} author={video.author} />
                </li>
            ))}
            </ul>
        </div>
        </div>

    </div>
  );
};

export default VideoSearch;
