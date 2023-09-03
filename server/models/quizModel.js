const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true },
});


const QuizQuestion = mongoose.model('Trivia', quizQuestionSchema,'Trivia');

module.exports = QuizQuestion;
