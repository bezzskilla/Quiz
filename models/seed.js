const mongoose = require('mongoose');
const { UserModel, VentilationModel, ConditionModel } = require('./mongoose.js');



async function createVentilationQuestions() {

  await VentilationModel.create({
    question: 'На каком объекте планируется монтаж вентиляции?',
    arrAnswers: [
      'Частный дом',
      'Квартира',
      'Другое'
    ]
  })

  await VentilationModel.create({
    question: 'Какие из перечисленных проблем характерны для вашего помещения?',
    arrAnswers: [
      'Душно, не хватает воздуха',
      'На стенках грибок, плесень',
      'Потеют, конденсируют, плачут окна',
      'Спертый/тяжелый воздух',
      'Нужна вентиляция в туалете и на кухне',
      'Никаких. Черновая отделка, хочу сразу сделать вентиляцию'
    ]
  })

  await VentilationModel.create({
    question: 'У Вас в семье есть люди, страдающие аллергией, заболеваниями дыхательных путей?',
    arrAnswers: [
      'Да',
      'Нет',
    ]
  })

  await VentilationModel.create({
    question: 'Сколько членов семьи проживают или планируют проживать в помещении?',
    arrAnswers: [
      '1-2',
      '3-4',
      '5-6',
      'Более 6'
    ]
  })

  await VentilationModel.create({
    question: 'Укажите количество жилых комнат:',
    arrAnswers: [
      '1',
      '2',
      '3',
      '4',
      'Более 4'
    ]
  })

  await VentilationModel.create({
    question: 'Укажите высоту потолков:',
    arrAnswers: [
      'До 3 метров',
      '3-4 метра',
      '4-5 метра',
      'Более 5 метров'
    ]
  })

  await VentilationModel.create({
    question: 'Сколько квадратных метров на объекте?',
    arrAnswers: [
      'До 40 м²',
      'От 40 до 80 м²',
      'От 80 до 150 м²',
      'От 150 до 250 м²',
      'От 250 до 400 м²',
      'Более 400 м²'
    ]
  })

  await VentilationModel.create({
    question: 'Как срочно Вам нужна вентиляция?',
    arrAnswers: [
      'Как можно раньше',
      'В течение 1 недели ',
      'От 2 до 4 недель',
      'Через 1-2 месяца',
      'Более чем через 2 месяца'
    ]
  })
}


async function createConditionQuestions() {

  await ConditionModel.create({
    question: 'На какое помещение подбираем кондиционер?',
    arrAnswers: [
      'Квартира',
      'Офис',
      'Дом/Коттедж',
      'Кафе/ресторан',
      'Другое'
    ]
  })

  await ConditionModel.create({
    question: 'Куда хотите установить кондиционер?',
    arrAnswers: [
      'Спальня',
      'Зал',
      'Кухня',
      'Погреб',
      'Другое',
    ]
  })

  await ConditionModel.create({
    question: 'В каких режимах планируете использовать кондиционер?',
    arrAnswers: [
      'Только для охлаждения летом',
      'Для охлаждения летом и обогрева в межсезонье',
      'Для охлаждения летом и отопления зимой',
      'Для охлаждения круглый год',
      'Для обогрева круглый год'
    ]
  })

  await ConditionModel.create({
    question: 'Укажите примерную площадь помещения:',
    arrAnswers: [
      '0-20 м²',
      '20-40 м²',
      '40-60 м²',
      '60-80 м²',
      '80-100 м²',
      'Более 100 м²'
    ]
  })

  await ConditionModel.create({
    question: 'Сделан ли в помещении ремонт?',
    arrAnswers: [
      'Да, ремонт сделан',
      'Нет, на этапе черновых работ',
    ]
  })

  await ConditionModel.create({
    question: 'Какие функции принципиальны при выборе кондиционера?',
    arrAnswers: [
      'Инвертор',
      'Очистка воздуха',
      'Wi-fi модуль',
      'Цветной корпус'
    ]
  })

  await ConditionModel.create({
    question: 'В какой бюджет планируете уложиться вместе с установкой?',
    arrAnswers: [
      '15-30',
      '30-45',
      '45-60',
      '60-75',
      '75-95',
    ]
  })
}

createConditionQuestions();
// Создание коллекции вопросов про кондиционеры

createVentilationQuestions();
// Создание коллекции вопросов про вентиляционные системы
