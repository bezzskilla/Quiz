const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const fs = require('fs');
const { UserModel, ConditionModel } = require('../models/mongoose');

const router = express.Router();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.DATABASE_EMAIL}`,
    pass: `${process.env.DATABASE_EMAIL_PASSWORD}`,
  },
});

let send = {
  from: '"Информация о клиентах" <getSplitInfo@gmail.com>',
  to: 'Bezobazov1999@gmail.com',
  subject: 'Новый клиент!',
  attachments: [
    { filename: 'info.txt', path: './info.txt' },
  ],
};

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
    let parsedAnswers = ''
    answers.forEach((el,i) => {
      parsedAnswers +=`${i+1}:`   +el.question + '\n   Ответ:' + el.answers + '\n'
    })
    if (email.length > 0) {
      fs.writeFile('./info.txt', `\nEmail:   ${email} \n\nPhone:   ${phone} \n\n${parsedAnswers}`, (error) => {
        if (error) {
          throw console.error();
        }
      });
      transporter.sendMail(send, function (error, info) {
        if (error) {
          console.log(error);
        }
        else {
          console.log('email sent ' + info.response);
        }
      });
      const user = new UserModel({
        email,
        phone,
        answers,
      });
      await user.save();
      res.json(user);
    }
    else {
      fs.writeFile('./info.txt', `Phone:   ${phone} \n\n${parsedAnswers}`, (error) => {
        if (error) {
          throw console.error();
        }
      });
      transporter.sendMail(send, function (error, info) {
        if (error) {
          console.log(error);
        }
        else {
          console.log('email sent ' + info.response);
        }
      });
      const user = new UserModel({
        phone,
        answers,
      });
      await user.save();
      res.json(user);
    }
  });

module.exports = router;
