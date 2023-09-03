const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema, 'Leaderboard');

module.exports = Leaderboard;
