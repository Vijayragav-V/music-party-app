const axios = require('axios');

const API_KEY = 'AIzaSyAK_951jvzVvHlDPhP-xTdlhg1z1VGUlNQ';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchVideos = async (query) => {
  if (!query) {
    throw new Error('Search query is required');
  }

  try {
    const response = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
      },
    });

    return response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error('Error fetching video search results:', error.message);
    throw new Error('Failed to fetch video search results');
  }
};

const playVideo = (req, res) => {
    const { videoId } = req.body;
  
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
  
    try {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      res.json({ embedUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate video embed URL' });
    }
  };

module.exports = { searchVideos, playVideo };