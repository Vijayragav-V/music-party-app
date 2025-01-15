const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
      },
    });

    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      author: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching video search results:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
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