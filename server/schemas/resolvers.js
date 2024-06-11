const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types;


const resolvers = {
  Query: {
    users: async () => {
      console.log('Fetching users');
      return User.find();
    },
    user: async (parent, { username }) => {
      console.log(`Fetching user with username: ${username}`);
      return User.findOne({ username });
    },
    quiz: async (parent, { _id }) => {
      console.log(`Fetching user with quiz: ${_id}`);
      return Quiz.findOne({ _id: new ObjectId(_id)  });
    },
    topPerformers: async () => {
      console.log('Fetching top performers');
      return User.find().sort({ points: -1 }).limit(10);
    },
    quizzes: async (parent, { level }) => {
      console.log(`Fetching quizzes with level: ${level}`);
      return Quiz.find({ level });
    },
  },
  Mutation: {
    addUser: async (parent, { username, password, avatar }) => {
      console.log(`Adding user with username: ${username}`);
      const user = await User.create({ username, password, avatar });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      console.log(`Logging in user with username: ${username}`);
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUserScore: async (parent, { username, points }, context) => {
      if (context.user) {
        console.log(`Updating score for user with username: ${username}`);
        return User.findOneAndUpdate(
          { username },
          { $inc: { points } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
