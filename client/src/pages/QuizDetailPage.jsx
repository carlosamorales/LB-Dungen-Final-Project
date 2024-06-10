import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ } from '../utils/queries';

const QuizDetailPage = () => {
  const { quizId } = useParams(); // Ensure this matches your route parameter
  const { loading, error, data } = useQuery(QUERY_QUIZ, {
    variables: { quizId },
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    const correctAnswers = data.quiz.questions.filter((q, index) => q.correctAnswer === selectedAnswers[index]).length;
    alert(`You got ${correctAnswers} out of ${data.quiz.questions.length} correct!`);
  };

  return (
    <div className="quiz-detail">
      <h2>{data.quiz.title}</h2>
      {data.quiz.questions.map((question, index) => (
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
