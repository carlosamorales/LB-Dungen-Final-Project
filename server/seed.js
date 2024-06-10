const mongoose = require('mongoose');
const { User, Quiz } = require('./models'); // Adjust the import based on your model structure

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/languagedungeon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  await User.deleteMany({});
  await Quiz.deleteMany({});

  const users = [
    { username: 'user1', password: 'password1', avatar: 'avatar1.png', points: 10 },
    { username: 'user2', password: 'password2', avatar: 'avatar2.png', points: 20 },
    { username: 'user3', password: 'password3', avatar: 'avatar3.png', points: 30 },
    { username: 'user4', password: 'password4', avatar: 'avatar4.png', points: 40 },
    { username: 'user5', password: 'password5', avatar: 'avatar5.png', points: 50 },
  ];

  const quizzes = [
    {
      title: 'Easy Spanish',
      level: 'Easy',
      questions: [
        { question: 'What is "hello" in Spanish?', options: ['Hola', 'Bonjour', 'Hello'], correctAnswer: 'Hola' },
        { question: 'What is "goodbye" in Spanish?', options: ['Adiós', 'Au revoir', 'Goodbye'], correctAnswer: 'Adiós' },
        { question: 'What is "thank you" in Spanish?', options: ['Gracias', 'Merci', 'Thank you'], correctAnswer: 'Gracias' },
      ],
    },
    {
      title: 'Medium Spanish',
      level: 'Medium',
      questions: [
        { question: 'What is "good morning" in Spanish?', options: ['Buenos días', 'Bonjour', 'Good morning'], correctAnswer: 'Buenos días' },
        { question: 'What is "good night" in Spanish?', options: ['Buenas noches', 'Bonne nuit', 'Good night'], correctAnswer: 'Buenas noches' },
      ],
    },
    {
      title: 'Hard Spanish',
      level: 'Hard',
      questions: [
        { question: 'What is "see you later" in Spanish?', options: ['Hasta luego', 'À plus tard', 'See you later'], correctAnswer: 'Hasta luego' },
      ],
    },
  ];

  await User.insertMany(users);
  await Quiz.insertMany(quizzes);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();
