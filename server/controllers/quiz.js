const Trivia = require('../models/quizModel');

// Function to fetch 5 random quiz questions
async function getQuestions(req, res) {
    try {
        const quizQuestions = await Trivia.aggregate([{ $sample: { size: 5 } }]);
        res.json(quizQuestions);
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
}

module.exports = {
    getQuestions,
};

