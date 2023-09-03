const Genre = require('../models/genreModel');
const { v4: uuidv4 } = require('uuid');

// Function to get all genres from the database
exports.getAllGenre = async (req, res) => {
    try {
        // Fetching all genres from the database using Genre.find()
        const allGenres = await Genre.find();
        console.log(allGenres);

        // Returning the list of genres as a JSON response with 201 status
        return res.status(201).json(allGenres);
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to get the genres" });
    }
}
