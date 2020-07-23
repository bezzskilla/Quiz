const express = require('express');
const { VentilationModel } = require('../models/mongoose');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('ventilation');
  })
  .get('/question', async (req, res) => {
    const quiz = await VentilationModel.find();
    res.json(quiz);
  });

module.exports = router;
