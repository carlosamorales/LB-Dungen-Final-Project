// client/src/pages/QuizDetailPage.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ } from '../utils/queries';

const QuizDetailPage = () => {
  const { level } = useParams();
  const { loading, error, data } = useQuery(QUERY_QUIZ, {
    variables: { level },
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    const correctAnswers = data.quizzes[0].questions.filter((q, index) => q.correctAnswer === selectedAnswers[index]).length;
    alert(`You got ${correctAnswers} out of ${data.quizzes[0].questions.length} correct!`);
  };

  return (
    <div className="quiz-detail">
      <h2>{data.quizzes[0].title}</h2>
      {data.quizzes[0].questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={selectedAnswers[index] === option}
                onChange={() => handleAnswerSelect(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
};

export default QuizDetailPage;
