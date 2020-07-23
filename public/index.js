const conditionButton = document.querySelector('#conditionButton');
const ventilationButton = document.querySelector('#ventilationButton');
const dialogAboutCondition = document.querySelector('#dialogAboutCondition');
const dialogAboutVentilation = document.querySelector('#dialogAboutVentilation');
const closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition');
const closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation');
const forConditionhbs = document.querySelector('#forConditionhbs');

let counterOfCondition = 0;
let allQustionOfCondition = null;

let answerOfUser = {
  email: String,
  phone: String,
  answers: [{
    question: String,
    answers: Array,
  }],
};
let neededArr = [];

if (conditionButton) {
  conditionButton.addEventListener('click', async (e) => {
    conditionButton.style.cssText = 'display: none;';
    dialogAboutCondition.style.cssText = 'display: flex';
    dialogAboutCondition.show(); // показываем диалоговое окно кондиционеров
    const response = await fetch('/conditioner/question');
    const resp = await response.json();
    allQustionOfCondition = resp;
    const hbsresponce = await fetch('/hbs/first.hbs');
    const HBShtml = await hbsresponce.text();
    const template = Handlebars.compile(HBShtml);
    const html = template({
      question: resp[counterOfCondition].question,
      arrAnswers: resp[counterOfCondition].arrAnswers,
    });
    counterOfCondition += 1;
    forConditionhbs.innerHTML = html;
    console.log(counterOfCondition);
  });
}
forConditionhbs.addEventListener('click', async (e) => {
  if (e.target.id === 'submitToCondition') {
    e.preventDefault();
    if (counterOfCondition === 5) {
      // прогресс бар на некоторые вопросы
      // отрисовка другой хбс
    }
    if (counterOfCondition < allQustionOfCondition.length) {
      const hbsresponce = await fetch('/hbs/first.hbs');
      const HBShtml = await hbsresponce.text();
      const template = Handlebars.compile(HBShtml);
      const html = template({
        question: allQustionOfCondition[counterOfCondition].question,
        arrAnswers: allQustionOfCondition[counterOfCondition].arrAnswers,
      });
      // -----------------------------------запись ответов
      const question = document.getElementById('main').children[0];
      const ul = document.getElementById('answers').children;
      const arrOfAnwers = Array.from(ul).map((element) => element.firstElementChild);
      neededArr = [];
      for (let i = 0; i < arrOfAnwers.length; i += 1) {
        if (arrOfAnwers[i].checked) {
          neededArr.push(arrOfAnwers[i].value);
        }
      }
      answerOfUser.answers.push({
        question: question.innerText,
        answers: neededArr,
      });
      console.log(answerOfUser);
      // -----------------------------------запись ответов

      counterOfCondition += 1;
      forConditionhbs.innerHTML = html;
    }
    if (counterOfCondition === allQustionOfCondition.length) {
      const endResponce = await fetch('/hbs/endOfQuiz.hbs');
      const endHBShtml = await endResponce.text();
      const template = Handlebars.compile(endHBShtml);
      const html = template();
      counterOfCondition = 0;
      answerOfUser.answers.shift();
      console.log(answerOfUser);
      // console.log(counterOfCondition);
      forConditionhbs.innerHTML = html;
    }
  }
});

if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async (e) => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.style.cssText = 'display: none;';
    counterOfCondition = 0;
    // console.log(counterOfCondition);
    allQustionOfCondition = null;
    answerOfUser = {
      email: String,
      phone: String,
      answers: [{
        question: String,
        answers: Array,
      }]
    };
    dialogAboutCondition.close(); // прячем диалоговое окно кондиционеров
  });
}

if (ventilationButton) {
  ventilationButton.addEventListener('click', async (e) => {
    ventilationButton.style.cssText = 'display: none;';
    dialogAboutVentilation.style.cssText = 'display: flex';
    dialogAboutVentilation.show(); // показываем диалоговое окно вентиляции
  });
}
if (closeDialogAboutVentilation) {
  closeDialogAboutVentilation.addEventListener('click', async (e) => {
    dialogAboutVentilation.style.cssText = 'display: none;';
    ventilationButton.style.cssText = '';
    dialogAboutVentilation.close(); // прячем диалоговое окно вентиляции
  });
}
