const mongoose = require('mongoose');

// Define the genre schema
const genreSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String }
});

// Create the Genre model based on the genre schema
const Genre = mongoose.model('Genre', genreSchema, 'Genres');

module.exports = Genre;
