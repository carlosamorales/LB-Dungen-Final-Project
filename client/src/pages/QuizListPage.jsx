import React from 'react';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  return (
    <div className="quiz-list">
      <h2>Select a Quiz</h2>
      <ul>
        <li><Link to="/quiz/6667bd3e7ad9f0e10c64ecdb">Easy Spanish</Link></li>
        <li><Link to="/quiz/6667bd3e7ad9f0e10c64ecdf">Medium Spanish</Link></li>
        <li><Link to="/quiz/6667bd3e7ad9f0e10c64ece2">Hard Spanish</Link></li>
      </ul>
    </div>
  );
};

export default QuizListPage;
