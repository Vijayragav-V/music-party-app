const express = require ('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.get('/search-videos', videoController.searchVideos);
router.get('/play-video', videoController.playVideo);

module.exports = router;