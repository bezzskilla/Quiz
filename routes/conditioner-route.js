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
    res.json({ isOkey: "okey" });
  })

module.exports = router;
