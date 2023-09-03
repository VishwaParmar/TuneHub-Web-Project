const express = require('express');
const adminController = require('../controllers/admin.js');

const router = express.Router();

// Route to add a new song
router.post('/add/song', adminController.addSong);

// Route to get all songs
router.get('/songs', adminController.getSongs);

// Route to update a song by its ID
router.put('/update/song/:id', adminController.updateSong);

// Route to delete a song by its ID
router.delete('/delete/song/:id', adminController.deleteSong);

// Export the router to be used in the main app
module.exports = router;
