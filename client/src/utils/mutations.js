import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $avatar: String!) {
    addUser(username: $username, password: $password, avatar: $avatar) {
      token
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export const UPDATE_USER_SCORE = gql`
  mutation updateUserScore($score: Int!) {
    updateUserScore(score: $score) {
      _id
      username
      points
    }
  }
`;
