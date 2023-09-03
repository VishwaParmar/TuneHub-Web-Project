const express = require('express');
const reviewController = require('../controllers/review.js');

const router = express.Router();

// Route to add a new review for a song
router.post('/add/:id', reviewController.addReview);

// Route to edit an existing review for a song
router.put('/edit/:id', reviewController.editReview);

// Route to remove a review for a song
router.delete('/delete/:id', reviewController.removeReview);

// Route to get all reviews for a song by its ID
router.get('/reviews/:id', reviewController.getReviews);

// Export the router to be used in the main app
module.exports = router;
