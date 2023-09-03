const express = require('express');

const songController = require('../controllers/song.js');

const router = express.Router();

router.get('/:id', songController.getSong);

module.exports = router;