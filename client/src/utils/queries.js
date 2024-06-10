import { gql } from '@apollo/client';

export const QUERY_TOP_PERFORMERS = gql`
  query getTopPerformers {
    topPerformers {
      username
      points
    }
  }
`;

export const QUERY_QUIZZES_BY_LEVEL = gql`
  query getQuizzesByLevel($level: String!) {
    quizzes(level: $level) {
      _id
      title
      level
      questions {
        question
        options
      }
    }
  }
`;

export const QUERY_QUIZ = gql`
  query getQuiz($quizId: ID!) {
    quiz(_id: $quizId) {
      title
      level
      questions {
        question
        options
        correctAnswer
      }
    }
  }
`;
