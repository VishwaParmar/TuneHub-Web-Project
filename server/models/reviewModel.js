const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  reviewId: { type: String },
  userName: { type: String },
  rating: { type: Number },
  comment: { type: String }
});

// Create the Review model based on the review schema
const Review = mongoose.model('Review', reviewSchema, 'Song');

module.exports = Review;
