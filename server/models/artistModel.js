const mongoose = require('mongoose');

// Define the artist schema
const artistSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    genre: { type: Array, default: [] },
    image: {type: String}
})

// Create the Artist model based on the artist schema
const Artist = mongoose.model('Artist', artistSchema, 'Artist');

// Static method to check if an artist with the given name already exists
Artist.checkIfArtistAlreadyPresent = async function (name) {
    try {
        // Find an artist with the given name
        const existingArtist = await this.findOne({ name });
        if (existingArtist !== null) {
            return true; // Return true if an artist with the same name already exists
        }
    } catch (error) {
        console.error("Error checking artist", error);
        return false; // Return false in case of any error
    }
};

module.exports = Artist;
