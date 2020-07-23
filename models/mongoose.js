const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();


// const connectionAddress = `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.1ppy5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const connectionAddress = `mongodb+srv://Quiz:Quiz123@cluster0.bywip.mongodb.net/Quiz?retryWrites=true&w=majority`

mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.pluralize(null);

const userSchema = mongoose.Schema({
  name: String,
  phone: Number,
  answers: Array
})

const quizSchema = mongoose.Schema({
  question: String,
  arrAnswers: Array,
})

const UserModel = mongoose.model('User', userSchema);
const VentilationModel = mongoose.model('Ventilation', quizSchema);
const ConditionModel = mongoose.model('Condition', quizSchema);

module.exports = { UserModel, VentilationModel, ConditionModel };
