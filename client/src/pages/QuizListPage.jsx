// client/src/pages/QuizListPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  return (
    <div className="quiz-list">
      <h2>Select a Quiz</h2>
      <ul>
        <li><Link to="/quiz/easy">Easy Spanish</Link></li>
        <li><Link to="/quiz/medium">Medium Spanish</Link></li>
        <li><Link to="/quiz/hard">Hard Spanish</Link></li>
      </ul>
    </div>
  );
};

export default QuizListPage;
