const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('quizCount').get(function () {
  return this.quizzes.length;
});

const User = model('User', userSchema);

module.exports = User;
