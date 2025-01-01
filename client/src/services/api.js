import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

const searchVideos = async (query) => {
  try {
    const response = await axios.post(`${BASE_URL}/search-videos`, { query });
    return response.data;
  } catch (error) {
    console.error('Error searching for videos:', error);
    throw error;
  }
};


const playVideo = async (videoId) => {
  try {
    await axios.post(`${BASE_URL}/play-video`, { videoId });
  } catch (error) {
    console.error('Error playing video:', error);
    throw error;
  }
};

export { searchVideos, playVideo };