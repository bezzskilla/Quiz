const conditionButton = document.querySelector('#conditionButton');
const ventilationButton = document.querySelector('#ventilationButton');
const dialogAboutCondition = document.querySelector('#dialogAboutCondition');
const dialogAboutVentilation = document.querySelector('#dialogAboutVentilation');
const closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition');
const closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation');
const forConditionhbs = document.querySelector('#forConditionhbs');
const condProgressBar = document.getElementById('condProgressBar');
const condDiscountBadge = document.getElementById('condDiscountBadge');
// const lastBtnCond = document.querySelector('#lastBtnCond');
const ventProgressBar = document.getElementById('progressBar')

let answerOfUser = {
  email: String,
  phone: String,
  answers: [{
    question: String,
    answers: Array,
  }],
};
let neededArr = [];
let counterOfCondition = 0;


let allQustionOfCondition = null;
const discountCounter = 0;
let condPercentCounter = 12;
let ventPercentCounter = 8;

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
    console.log(counterOfCondition);
    forConditionhbs.innerHTML = html;
  });
}
if (forConditionhbs) {
  forConditionhbs.addEventListener('click', async (e) => {
    if (e.target.id == 'submitToCondition') {
      e.preventDefault();
      let percent = (condPercentCounter += 12)
      condProgressBar.style.cssText = `width: ${percent}%`
      condProgressBar.innerText = `${percent}%`
      if (counterOfCondition === 3) {
        // прогресс бар на некоторые вопросы
        // отрисовка другой хбс
        // const polzResponce = await fetch('/hbs/polzunok.hbs')
        // let polzHBShtml = await polzResponce.text();
        // let template = Handlebars.compile(polzHBShtml);
        // let html = template();
        // counterOfCondition++;
        // console.log(counterOfCondition)
        // forConditionhbs.innerHTML = html;
        // return
      }
      if (counterOfCondition === 6) {
        // прогресс бар на некоторые вопросы
        // отрисовка другой хбс
        // const polzResponce = await fetch('/hbs/polzunok.hbs')
        // let polzHBShtml = await polzResponce.text();
        // let template = Handlebars.compile(polzHBShtml);
        // let html = template();
        // counterOfCondition++;
        // console.log(counterOfCondition)
        // forConditionhbs.innerHTML = html;
        // return
      }
      if (counterOfCondition > allQustionOfCondition.length - 1) {
        const endResponce = await fetch('/hbs/endOfCondQuiz.hbs');
        const endHBShtml = await endResponce.text();
        const template = Handlebars.compile(endHBShtml);
        const html = template();
        // -----------------------------------запись ответов
        const question = document.getElementById('main').children[0];
        const ul = document.getElementById('answers').children;
        const arrOfAnwers = Array.from(ul).map((element) => element.firstElementChild);
        neededArr = [];
        for (let i = 0; i < arrOfAnwers.length; i += 1) {
          if (arrOfAnwers[i].checked) {
            neededArr.push(arrOfAnwers[i].parentElement.innerText);
          }
        }
        answerOfUser.answers.push({
          question: question.innerText,
          answers: neededArr,
        });
        // -----------------------------------запись ответов
        answerOfUser.answers.shift();
        counterOfCondition = 0;
        forConditionhbs.innerHTML = html;
        return;
      }
      if (counterOfCondition <= allQustionOfCondition.length - 1) {
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
            neededArr.push(arrOfAnwers[i].parentElement.innerText);
          }
        }
        answerOfUser.answers.push({
          question: question.innerText,
          answers: neededArr,
        });
        // -----------------------------------запись ответов
        counterOfCondition += 1;
        forConditionhbs.innerHTML = html;
      }
    }
    // if (e.target.id == "backToReality") {
    //   e.preventDefault();
    //   debugger
    //   counterOfCondition -= 1;
    //   const hbsresponce = await fetch('/hbs/first.hbs');
    //   const HBShtml = await hbsresponce.text();
    //   const template = Handlebars.compile(HBShtml);
    //   const html = template({
    //     question: allQustionOfCondition[counterOfCondition].question,
    //     arrAnswers: allQustionOfCondition[counterOfCondition].arrAnswers,
    //   });
    //   // //запись ответов
    //   // counterOfCondition += 1;
    //   forConditionhbs.innerHTML = html;
    // }
    if (e.target.id == "lastBtnCond") {
      e.preventDefault();
      // answerOfUser.answers.forEach((el, i) => {
      //   if (el.answers.length === 0) el.answers[i].slice(i, 1)
      // })
      // --------------------------------read email and phone of user
      condProgressBar.style.cssText = 'width: 100%'
      condProgressBar.innerText = '100%'
      const userInfoForm = document.getElementById('userInfo');
      answerOfUser.phone = userInfoForm.children[1].value;
      answerOfUser.email = userInfoForm.children[5].value;
      // --------------------------------read email and phone of user
      const responce = await fetch('/conditioner/final', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: answerOfUser.email,
          phone: answerOfUser.phone,
          answers: answerOfUser.answers,
        }),
      });
      const resp = await responce.json();
      const lastResponce = await fetch('/hbs/thx.hbs');
      const lastText = await lastResponce.text();
      const template = Handlebars.compile(lastText);
      const html = template();
      forConditionhbs.innerHTML = html;
    }
    if (e.target.id == "close") {
      e.preventDefault();
      conditionButton.style.cssText = '';
      dialogAboutCondition.style.cssText = 'display: none;';
      condPercentCounter = 8
      condProgressBar.style.cssText = `width: ${condPercentCounter}`
      condProgressBar.innerText = ''
      counterOfCondition = 0;
      allQustionOfCondition = null;
      forConditionhbs.innerHTML = '';
      answerOfUser = {
        email: String,
        phone: String,
        answers: [{
          question: String,
          answers: Array,
        }],
      };
      dialogAboutCondition.close();
    }
  });
}

if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async (e) => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.style.cssText = 'display: none;';
    condPercentCounter = 8
    condProgressBar.style.cssText = `width: ${condPercentCounter}`
    condProgressBar.innerText = ''
    counterOfCondition = 0;
    allQustionOfCondition = null;
    forConditionhbs.innerHTML = '';
    answerOfUser = {
      email: String,
      phone: String,
      answers: [{
        question: String,
        answers: Array,
      }],
    };
    dialogAboutCondition.close(); // прячем диалоговое окно кондиционеров
  });
}

const forVentilationhbs = document.querySelector('#forVentilationhbs');
let counterOfVentilation = 0;
let allQustionOfVentilation = null;

if (ventilationButton) {
  ventilationButton.addEventListener('click', async (e) => {
    ventilationButton.style.cssText = 'display: none;';
    dialogAboutVentilation.style.cssText = 'display: flex';
    dialogAboutVentilation.show(); // показываем диалоговое окно вентиляции
    const response = await fetch('/ventilation/question');
    const resp = await response.json();
    allQustionOfVentilation = resp;
    const hbsresponce = await fetch('/hbs/first.hbs');
    const HBShtml = await hbsresponce.text();
    const template = Handlebars.compile(HBShtml);
    const html = template({
      question: resp[counterOfVentilation].question,
      arrAnswers: resp[counterOfVentilation].arrAnswers,
    });
    counterOfVentilation += 1;
    forVentilationhbs.innerHTML = html;
  });
}
if (forVentilationhbs) {
  forVentilationhbs.addEventListener('click', async (e) => {
    if (e.target.id === 'submitToCondition') {
      e.preventDefault();
      let percent = (ventPercentCounter += 11)
      progressBar.style.cssText = `width: ${percent}%`
      progressBar.innerText = `${percent}%`
      if (counterOfVentilation > allQustionOfVentilation.length - 1) {
        const endResponce = await fetch('/hbs/endOfVentQuiz.hbs');
        const endHBShtml = await endResponce.text();
        const template = Handlebars.compile(endHBShtml);
        const html = template();
        // -----------------------------------запись ответов
        const question = document.getElementById('main').children[0];
        const ul = document.getElementById('answers').children;
        const arrOfAnwers = Array.from(ul).map((element) => element.firstElementChild);
        neededArr = [];
        for (let i = 0; i < arrOfAnwers.length; i += 1) {
          if (arrOfAnwers[i].checked) {
            neededArr.push(arrOfAnwers[i].parentElement.innerText);
          }
        }
        answerOfUser.answers.push({
          question: question.innerText,
          answers: neededArr,
        });
        // -----------------------------------запись ответов
        answerOfUser.answers.shift();
        counterOfVentilation = 0;
        forVentilationhbs.innerHTML = html;

        return;
      }
      if (counterOfVentilation <= allQustionOfVentilation.length - 1) {
        const hbsresponce = await fetch('/hbs/first.hbs');
        const HBShtml = await hbsresponce.text();
        const template = Handlebars.compile(HBShtml);
        const html = template({
          question: allQustionOfVentilation[counterOfVentilation].question,
          arrAnswers: allQustionOfVentilation[counterOfVentilation].arrAnswers,
        });
        // -----------------------------------запись ответов
        const question = document.getElementById('main').children[0];
        const ul = document.getElementById('answers').children;
        const arrOfAnwers = Array.from(ul).map((element) => element.firstElementChild);
        neededArr = [];
        for (let i = 0; i < arrOfAnwers.length; i += 1) {
          if (arrOfAnwers[i].checked) {
            neededArr.push(arrOfAnwers[i].parentElement.innerText);
          }
        }
        answerOfUser.answers.push({
          question: question.innerText,
          answers: neededArr,
        });
        // -----------------------------------запись ответов
        counterOfVentilation += 1;
        forVentilationhbs.innerHTML = html;
      }
    }
    if (e.target.id == "lastBtnVent") {
      e.preventDefault();
      // answerOfUser.answers.forEach((el, i) => {
      //   if (el.answers.length === 0) el.answers[i].slice(i, 1)
      // })
      ventProgressBar.style.cssText = 'width: 100%'
      ventProgressBar.innerText = '100%'
      const responce = await fetch('/ventilation/final', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: answerOfUser.email,
          phone: answerOfUser.phone,
          answers: answerOfUser.answers,
        }),
      })
      const resp = await responce.json()
      const lastResponce = await fetch('/hbs/thx.hbs')
      const lastText = await lastResponce.text();
      const template = Handlebars.compile(lastText);
      const html = template();
      forVentilationhbs.innerHTML = html;
    }
    if (e.target.id == "close") {
      e.preventDefault();
      dialogAboutVentilation.style.cssText = 'display: none;';
      ventilationButton.style.cssText = '';
      forVentilationhbs.innerHTML = '';
      ventPercentCounter = 8
      ventProgressBar.style.cssText = `width: ${ventPercentCounter}`
      ventProgressBar.innerText = ''
      allQustionOfVentilation = null;
      answerOfUser = {
        email: String,
        phone: String,
        answers: [{
          question: String,
          answers: Array,
        }],
      };
      counterOfVentilation = 0;
      dialogAboutVentilation.close();
    }
  });
}
if (closeDialogAboutVentilation) {
  closeDialogAboutVentilation.addEventListener('click', async (e) => {
    dialogAboutVentilation.style.cssText = 'display: none;';
    ventilationButton.style.cssText = '';
    forVentilationhbs.innerHTML = '';
    ventPercentCounter = 8
    ventProgressBar.style.cssText = `width: ${ventPercentCounter}`
    ventProgressBar.innerText = ''
    allQustionOfVentilation = null;
    answerOfUser = {
      email: String,
      phone: String,
      answers: [{
        question: String,
        answers: Array,
      }],
    };
    counterOfVentilation = 0;
    dialogAboutVentilation.close(); // прячем диалоговое окно вентиляции
  });
}
