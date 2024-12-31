const express = require ('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.post('/search-videos', videoController.searchVideos);
router.post('/play-video', videoController.playVideo);

module.exports = router;