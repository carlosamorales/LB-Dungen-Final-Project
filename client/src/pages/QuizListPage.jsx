import React from 'react';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  return (
    <div className="quiz-list">
      <h2>Select a Quiz</h2>
      <ul>
        <li><Link to="/quiz/quizId1">Easy Spanish</Link></li>
        <li><Link to="/quiz/quizId2">Medium Spanish</Link></li>
        <li><Link to="/quiz/quizId3">Hard Spanish</Link></li>
      </ul>
    </div>
  );
};

export default QuizListPage;
