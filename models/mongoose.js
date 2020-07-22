const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();


// const connectionAddress = `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.1ppy5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const connectionAddress = `mongodb+srv://Quiz:Quiz123@cluster0.bywip.mongodb.net/Quiz?retryWrites=true&w=majority`

mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.pluralize(null);

const userSchema = mongoose.Schema({
  name: String,
  phone: Number,
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
})

const quizSchema = mongoose.Schema({
  arrayQuestions: Array,
})

const UserModel = mongoose.model('User', userSchema);
const QuizModel = mongoose.model('Quiz', quizSchema);

UserModel.create({
  name: 'Man',
  phone: 8 - 999 - 999 - 99 - 99,
})

QuizModel.create({
  arrayQuestions: ['qwer', 'qwertyu', 'vkdcavhszdvbdubgesrbvjdrndfjvbdkjfbjkdf', 'jsdgbiuasviuabviarubiaeru', 'jhaebvebhe'],

})

// export { UserModel, QuizModel };
module.exports = { UserModel, QuizModel };
