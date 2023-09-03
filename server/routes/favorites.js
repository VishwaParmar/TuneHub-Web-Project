const express = require('express');

const favoritesController = require('../controllers/favorites.js');

const router = express.Router();

router.post('/:id', favoritesController.addFavorite);
router.delete('/:id', favoritesController.deleteFavorite);
router.get('/:id', favoritesController.getFavorite);
router.get('/:id/isFav', favoritesController.isFavorite);
router.post('/:id/isFav', favoritesController.isFavorite);

module.exports = router;
