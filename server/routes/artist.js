const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

// Route to add a new artist
router.post('/add', artistController.addArtist);

// Route to get an artist by ID
router.get('/:id', artistController.getArtist);

// Route to get all artists
router.get('/', artistController.getAllArtist);

// Export the router to be used in the main app
module.exports = router;
