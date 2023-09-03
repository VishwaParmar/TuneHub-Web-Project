const User = require("../models/UserModel.js");
const Song = require("../models/songModel.js");

exports.addFavorite = async (req, res) => {
    const userID = req.params.id;
    const { songID } = req.body;

    if (songID === null) {
        return res.status(400).json({ success: false, data: "Invalid request body!" });
    }
    try {
        const user = await User.findOne({ id: userID });
        if (user === null) {
            return res.status(400).json({ success: false, data: "Invalid user id!" });
        }
        if (user.favoriteSongs.indexOf(songID) < 0) {
            user.favoriteSongs.push(songID);
        }

        await User.updateOne({ id: userID }, user);
        return res.status(200).json({ message: "Song added to favorites successfully" });

    } catch (error) {
        console.error('Error adding song to favorite:', error);
        res.status(500).json({ error: 'Failed to add song to favorite' });
    }
}

exports.deleteFavorite = async (req, res) => {
    const userID = req.params.id;
    const { songID } = req.body;

    if (songID === null) {
        return res.status(400).json({ success: false, data: "Invalid request body!" });
    }
    try {
        const user = await User.findOne({ id: userID });
        if (user === null) {
            return res.status(400).json({ success: false, data: "Invalid user id!" });
        }

        if (user.favoriteSongs.indexOf(songID) >= 0) {
            user.favoriteSongs.splice(user.favoriteSongs.indexOf(songID), 1);
        }

        await User.updateOne({ id: userID }, user);
        return res.status(200).json({ message: "Song removed from favorites successfully" });

    } catch (error) {
        console.error('Error removing song from favorites:', error);
        res.status(500).json({ error: 'Failed to remove song from favorites' });
    }
}

exports.getFavorite = async (req, res) => {
    const userID = req.params.id;

    try {
        const user = await User.findOne({ id: userID });
        if (user === null) {
            return res.status(400).json({ success: false, data: "Invalid user id!" });
        }

        const favorites = user.favoriteSongs;
        let result = [];

        await Promise.all(favorites?.map(async (favorite, ind) => {
            const song = await Song.findOne({ id: favorite });
            result.push(song);
        }));

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
}

exports.isFavorite = async (req, res) => {
    const userID = req.params.id;
    const { songID } = req.body;

    if (songID === null) {
        return res.status(400).json({ success: false, data: "Invalid request body!" });
    }
    try {
        const user = await User.findOne({ id: userID });
        if (user === null) {
            return res.status(400).json({ success: false, data: "Invalid user id!" });
        }

        const favorites = user.favoriteSongs;
        if (favorites.indexOf(songID) >= 0) {
            return res.status(200).json({ "isFav": "true" });
        } else {
            return res.status(200).json({ "isFav": "false" });
        }

    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
}
exports.isFavorite = async (req, res) => {
    const userID = req.params.id;
    const { songID } = req.body;

    if (songID === null) {
        return res.status(400).json({ success: false, data: "Invalid request body!" });
    }
    try {
        const user = await User.findOne({ id: userID });
        if (user === null) {
            return res.status(400).json({ success: false, data: "Invalid user id!" });
        }

        const favorites = user.favoriteSongs;
        if (favorites.indexOf(songID) >= 0) {
            return res.status(200).json({ "isFav": "true" });
        } else {
            return res.status(200).json({ "isFav": "false" });
        }

    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
}