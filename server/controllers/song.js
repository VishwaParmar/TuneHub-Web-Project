const Song = require("../models/songModel");

exports.getSong = async (req, res) => {
    const id = req.params.id;
    try {

        const song = await Song.findOne({ id: id });

        return res.status(200).json(song);
    }
    catch (error) {
        console.error('Error getting song:', error);
        return res.status(500).json({ error: 'Failed to get song' });
    }
}