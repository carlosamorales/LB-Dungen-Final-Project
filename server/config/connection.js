const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
