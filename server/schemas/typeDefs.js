const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Question {
    question: String
    options: [String]
    correctAnswer: String
  }

  type Quiz {
    _id: ID
    title: String
    level: String
    questions: [Question]
  }

  type User {
    _id: ID
    username: String
    points: Int
    avatar: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    topPerformers: [User]
    quizzes(level: String!): [Quiz]
    quiz(_id: ID!): Quiz
  }

  type Mutation {
    addUser(username: String!, password: String!, avatar: String!): Auth
    login(username: String!, password: String!): Auth
    updateUserScore(username: String!, points: Int!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
