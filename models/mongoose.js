const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// const connectionAddress = `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.1ppy5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
// const connectionAddress = 'mongodb+srv://Quiz:Quiz123@cluster0.bywip.mongodb.net/Quiz?retryWrites=true&w=majority';
const connectionAddress = `mongodb+srv://Quiz:${process.env.DATABASE_EMAIL_PASSWORD}@cluster0.jsmw3.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
console.log(connectionAddress);
console.log('mong8');
mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.pluralize(null);

const userSchema = mongoose.Schema({
  email: String,
  phone: String,
  answers: Array,
});

const quizSchema = mongoose.Schema({
  question: String,
  arrAnswers: Array,
});

const UserModel = mongoose.model('User', userSchema);
const VentilationModel = mongoose.model('Ventilation', quizSchema);
const ConditionModel = mongoose.model('Condition', quizSchema);

module.exports = { UserModel, VentilationModel, ConditionModel };
