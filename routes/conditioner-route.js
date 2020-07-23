const express = require('express');
const { UserModel, ConditionModel } = require('../models/mongoose');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('condition');
  })
  .get('/question', async (req, res) => {
    const quiz = await ConditionModel.find();
    res.json(quiz);
  })
  .get('/questionNext', async (req, res) => {
    // await UserModel.updateOne({ _id: "какое то айди" }, { "апдейченный ответ"});
    res.json({ isOkey: 'okey' });
  })
  .post('/final', async (req, res) => {
    const {email, phone, answers} = req.body;
    const user = new UserModel({
      email,
      phone,
      answers,
    });
    await user.save();
    res.json();
  });

module.exports = router;
