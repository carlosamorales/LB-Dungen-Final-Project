// server/models/Quiz.js

const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  questions: [questionSchema],
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
