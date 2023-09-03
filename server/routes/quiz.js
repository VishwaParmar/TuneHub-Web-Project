const express = require('express');
const quizController = require('../controllers/quiz.js');

const router = express.Router();

// Get all quiz questions
router.get('/', quizController.getQuestions);

module.exports = router;
