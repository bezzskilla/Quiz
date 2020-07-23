const express = require('express');
const { UserModel, VentilationModel } = require('../models/mongoose');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('ventilation');
  })
  .get('/question', async (req, res) => {
    const quiz = await VentilationModel.find();
    res.json(quiz);
  })
  .post('/final', async (req, res) => {
    const { email, phone, answers } = req.body;
    const user = new UserModel({
      email,
      phone,
      answers,
    });
    await user.save();
    res.json(user);
  });

module.exports = router;
