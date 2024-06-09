const { User, Quiz } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('quizzes');
    },
    quizzes: async () => {
      return Quiz.find();
    },
    quiz: async (_, { id }) => {
      return Quiz.findById(id);
    },
  },
  Mutation: {
    addUser: async (_, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createQuiz: async (_, { title }) => {
      const newQuiz = new Quiz({ title });
      return await newQuiz.save();
    },
  },
};

module.exports = resolvers;
