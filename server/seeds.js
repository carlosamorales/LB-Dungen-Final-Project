const mongoose = require('mongoose');
const { User, Quiz, Question } = require('./models'); // Adjust the import based on your model structure

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/languagedungeon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  await User.deleteMany({});
  await Quiz.deleteMany({});
  await Question.deleteMany({});

  const users = [
    { username: 'user1', password: 'password1', points: 10 },
    { username: 'user2', password: 'password2', points: 20 },
    { username: 'user3', password: 'password3', points: 30 },
    { username: 'user4', password: 'password4', points: 40 },
    { username: 'user5', password: 'password5', points: 50 },
  ];

  const quizzes = [
    {
      title: 'Basic Spanish',
      questions: [
        { question: 'What is "hello" in Spanish?', options: ['Hola', 'Bonjour', 'Hello'], correctAnswer: 'Hola' },
        // Add 9 more questions here
      ],
    },
    {
      title: 'Intermediate Spanish',
      questions: [
        { question: 'What is "goodbye" in Spanish?', options: ['Adiós', 'Au revoir', 'Goodbye'], correctAnswer: 'Adiós' },
        // Add 9 more questions here
      ],
    },
    {
      title: 'Advanced Spanish',
      questions: [
        { question: 'What is "thank you" in Spanish?', options: ['Gracias', 'Merci', 'Thank you'], correctAnswer: 'Gracias' },
        // Add 9 more questions here
      ],
    },
  ];

  await User.insertMany(users);
  for (const quiz of quizzes) {
    const newQuiz = new Quiz({ title: quiz.title });
    for (const question of quiz.questions) {
      const newQuestion = new Question(question);
      await newQuestion.save();
      newQuiz.questions.push(newQuestion);
    }
    await newQuiz.save();
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();
