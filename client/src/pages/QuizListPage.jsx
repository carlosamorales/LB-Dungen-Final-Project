import React from 'react';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  return (
    <div className="quiz-list">
      <h2>Select a Quiz</h2>
      <ul>
        <li><Link to="/quiz/easy-spanish">Easy Spanish</Link></li>
        <li><Link to="/quiz/medium-spanish">Medium Spanish</Link></li>
        <li><Link to="/quiz/hard-spanish">Hard Spanish</Link></li>
      </ul>
    </div>
  );
};

export default QuizListPage;
