import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

const searchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-videos?q=${query}`);
    return response.data;
 
  } catch (error) {
    console.error('Error searching for videos:', error);
    throw error;
  }
};


const playVideo = async (videoId) => {
  try {
    await axios.get(`${BASE_URL}/play-video`, { videoId });
  } catch (error) {
    console.error('Error playing video:', error);
    throw error;
  }
};



export { searchVideos, playVideo };