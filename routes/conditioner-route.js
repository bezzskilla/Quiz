const express = require('express');
const { UserModel, ConditionModel } = require('../models/mongoose');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()
const fs = require('fs')
const router = express.Router();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.DATABASE_EMAIL}`,
    pass: `${process.env.DATABASE_EMAIL_PASSWORD}`
  }
});


let send = {
  from: '"Информация о клиентах" <getSplitInfo@gmail.com>',
  to: 'Bezobazov1999@gmail.com',
  subject: 'Новый клиент!',
  attachments: [
    { filename: 'info.txt', path: './txtFiles/info.txt' },
  ]
}

// let conditionMailSender = transporter.sendMail(send, function (error, info) {
//   if (error) {
//     console.log(error)
//   }
//   else {
//     console.log('email sent ' + info.response);
//   }
// })

router
  .get('/', (req, res) => {
    res.render('condition');
  })
  .get('/question', async (req, res) => {
    const quiz = await ConditionModel.find();
    res.json(quiz);
  })
  .post('/final', async (req, res) => {
    const { email, phone, answers } = req.body;
    if (email.length > 0) {
      console.log(email, phone, answers);
      const user = new UserModel({
        email,
        phone,
        answers,
      });
      await user.save();
      res.json(user);
    }
    else {
      console.log(email, phone, answers);
      const user = new UserModel({
        phone,
        answers,
      });
      await user.save();
      res.json(user)
    }
  });

module.exports = router;
