const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectionAddress = `mongodb+srv://Quiz:${process.env.DATABASE_EMAIL_PASSWORD}@cluster0.jsmw3.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
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
