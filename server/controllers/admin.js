const Song = require('../models/songModel.js')
const Review = require('../models/reviewModel.js');

// Function to add a new song to the database
exports.addSong = async (req, res) => {
    try {
        // Extracting data from the request body
        const { id, name, artist, duration, genres, releaseYear, image, reviews } = req.body;
        
        // Basic input validation to ensure required fields are not empty or null
        if (name == null || artist == null || duration == null ||
            name.trim() === '' || artist.length === 0 || duration.trim() === '') {
            return res.status(422).json({ error: "Invalid or empty input data" });
        }

        // Creating a new Song instance with the provided data
        const newSong = new Song({
            id,
            name,
            artist,
            duration,
            genres,
            releaseYear,
            reviews,
            image
        })

        // Saving the new song to the database
        const addedSong = await newSong.save();

        // Returning the added song as a JSON response with 201 status
        return res.status(201).json(addedSong);
    }
    catch (error) {
        // Handling errors and returning a 500 status with an error message
        console.error('Error creating song:', error);
        res.status(500).json({ error: 'Failed to create song' });
    }
};

// Function to get all songs from the database
exports.getSongs = async (req, res) => {
    try {
        // Fetching all songs from the database using Song.find()
        const songs = await Song.find();

        // Returning the list of songs as a JSON response with 201 status
        return res.status(201).json(songs);
    }
    catch (error) {
        // Handling errors and returning a 500 status with an error message
        console.error('Error creating song:', error);
        return res.status(500).json({ error: 'Failed to create song' });
    }
}

// Function to update an existing song in the database
exports.updateSong = async (req, res) => {
    const songId = req.params.id;
    const updatedData = req.body;
    
    // Input validation to ensure required fields are present in the updated data
    if (updatedData.id == null || updatedData.name == null || updatedData.artist == null ||
        updatedData.duration == null || updatedData.genres == null || updatedData.releaseYear == null) {
        return res.status(422).json({ error: 'Improper input has been given' });
    }

    try {
        // Updating the song's data in the database using Song.updateOne()
        await Song.updateOne({ id: songId }, updatedData);

        // Returning a 200 status with a success message
        return res.status(200).json({ message: "Song updated successfully" });
    }
    catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to update the song" });
    }
}

// Function to delete a song from the database
exports.deleteSong = async (req, res) => {
    const songId = req.params.id;

    // Input validation to ensure song ID is not null
    if (songId == null) {
        return res.status(422).json({ error: 'Improper input has been given' });
    }

    try {
        // Deleting the song from the database using Song.deleteOne()
        await Song.deleteOne({ id: songId });
        console.log("Inside delete");

        // Returning a 200 status with a success message
        return res.status(200).json({ message: "Song has been successfully removed" });
    }
    catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to delete the song" });
    }
}
