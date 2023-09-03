const mongoose = require('mongoose');
const uuid = require('uuid');

// Import the Review model
const Review = require('../models/reviewModel.js');

// Define the song schema
const songSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  artist: [{ type: String }],
  duration: { type: String },
  genres: [{ type: String }],
  releaseYear: { type: Number },
  reviews: [{ type: Review.schema, default: [] }], // Embed the Review schema within the song schema
  image: { type: String },
});

// Use a pre-save hook to generate a UUID for the song if it doesn't have one
songSchema.pre('save', async function (next) {
  try {
    if (!this.id) {
      this.id = uuid.v4(); // Generate a UUID only if the id field is not already set
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create the Song model based on the song schema
const Song = mongoose.model('Song', songSchema, 'Song');

module.exports = Song;
