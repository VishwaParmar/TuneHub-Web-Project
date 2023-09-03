const Artist = require('../models/artistModel');
const { v4: uuidv4 } = require('uuid');

// Function to add a new artist to the database
exports.addArtist = async (req, res) => {
    const { name, genre, image } = req.body;
    const newId = uuidv4();

    // Input validation to ensure required fields are not null or empty
    if (name === null || genre === null || genre.length === 0) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }

    try {
        // Checking if an artist with the same name already exists in the database
        const artistExists = await Artist.checkIfArtistAlreadyPresent(name);
        if (artistExists) {
            return res.status(409).json({ error: 'An artist with the same name already exists.' });
        }

        // Creating a new Artist instance with the provided data
        const newArtist = new Artist({
            id: newId,
            name,
            genre,
            image,
        });

        // Saving the new artist to the database
        const addedArtist = await newArtist.save();

        // Returning the added artist as a JSON response with 201 status
        return res.status(201).json(addedArtist);

    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to add the artist" });
    }
}

// Function to get a specific artist from the database based on the artist's ID
exports.getArtist = async (req, res) => {
    const artistId = req.params.id;

    // Input validation to ensure artist ID is not null
    if (artistId === null) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }

    try {
        // Finding the artist in the database using Artist.findOne()
        const artist = await Artist.findOne({ id: artistId });
        console.log(artist);

        // Returning the artist as a JSON response with 201 status
        return res.status(201).json(artist);
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to get the artist for the given id" });
    }
}

// Function to get all artists from the database
exports.getAllArtist = async (req, res) => {
    console.log("Here");
    try {
        // Fetching all artists from the database using Artist.find()
        const artists = await Artist.find();
        console.log(artists);

        // Returning the list of artists as a JSON response with 200 status
        return res.status(200).json(artists);
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to get the list of the artists" });
    }
}
