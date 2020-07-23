const express = require('express');
const { UserModel, ConditionModel } = require('../models/mongoose');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('condition');
  })
  .get('/question', async (req, res) => {
    const quiz = await ConditionModel.find();
    // await UserModel.create(); нам надо создать документ, куда впоследствие будем пушить ответы
    res.json(quiz);
  })
  .get('/questionNext', async (req, res) => {
    // await UserModel.updateOne({ _id: "какое то айди" }, { "апдейченный ответ"});
    res.json({ isOkey: "okey" });
  });

module.exports = router;
