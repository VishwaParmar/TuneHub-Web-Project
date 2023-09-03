const express = require('express');
const genreController = require('../controllers/genre');

const router = express.Router();

// Route to get all genres
router.get('/', genreController.getAllGenre);

// Export the router to be used in the main app
module.exports = router;
