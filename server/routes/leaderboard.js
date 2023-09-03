const express = require('express');
const leaderboard = require('../controllers/leaderboard.js');

const router = express.Router();

// Get all quiz questions
router.get('/', leaderboard.getLeaderboard);
router.post('/edit', leaderboard.editLeaderboard);

module.exports = router;
