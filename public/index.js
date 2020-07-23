let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')
let forConditionhbs = document.querySelector('#forConditionhbs')
let progressBar = document.getElementById('condProgressBar')
let condDiscountBadge = document.getElementById('condDiscountBadge')

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
let allQustionOfCondition = null
let discountCounter = 0;
let percentCounter = 12;

if (conditionButton) {
  conditionButton.addEventListener('click', async (e) => {
    conditionButton.style.cssText = 'display: none;';
    dialogAboutCondition.style.cssText = 'display: flex';
    dialogAboutCondition.show(); //показываем диалоговое окно кондиционеров
    const response = await fetch('/conditioner/question')
    const resp = await response.json()
    allQustionOfCondition = resp
    const hbsresponce = await fetch('/hbs/first.hbs')
    let HBShtml = await hbsresponce.text();
    let template = Handlebars.compile(HBShtml);
    let html = template({ question: resp[counterOfCondition].question, arrAnswers: resp[counterOfCondition].arrAnswers });
    console.log(counterOfCondition)
    counterOfCondition++;
    forConditionhbs.innerHTML = html;
  })
}
if (forConditionhbs) {
  forConditionhbs.addEventListener('click', async e => {
    if (e.target.id == 'submitToCondition') {
      e.preventDefault()


      if (counterOfCondition == 3) {
        //прогресс бар на некоторые вопросы
        //отрисовка другой хбс
        // const polzResponce = await fetch('/hbs/polzunok.hbs')
        // let polzHBShtml = await polzResponce.text();
        // let template = Handlebars.compile(polzHBShtml);
        // let html = template();
        // counterOfCondition++;
        // console.log(counterOfCondition)
        // forConditionhbs.innerHTML = html;
        // return
      }
      if (counterOfCondition == 6) {
        //прогресс бар на некоторые вопросы
        //отрисовка другой хбс
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
        const endResponce = await fetch('/hbs/endOfCondQuiz.hbs')
        let endHBShtml = await endResponce.text();
        let template = Handlebars.compile(endHBShtml);
        let html = template();
        counterOfCondition = 0;
        answerOfUser.answers.shift();
        console.log(counterOfCondition)
        forConditionhbs.innerHTML = html;
        console.log('конец')
        return
      }
      if (counterOfCondition <= allQustionOfCondition.length - 1) {
        const hbsresponce = await fetch('/hbs/first.hbs')
        let HBShtml = await hbsresponce.text();
        let template = Handlebars.compile(HBShtml);
        let html = template({ question: allQustionOfCondition[counterOfCondition].question, arrAnswers: allQustionOfCondition[counterOfCondition].arrAnswers });
        console.log(counterOfCondition)
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
        counterOfCondition++;
        forConditionhbs.innerHTML = html;
      }
    }
  })
}

if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async (e) => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.style.cssText = 'display: none;';
    counterOfCondition = 0;
    console.log(counterOfCondition)
    allQustionOfCondition = null
    forConditionhbs.innerHTML = '';
    answerOfUser = {
      email: String,
      phone: String,
      answers: [{
        question: String,
        answers: Array,
      }]
    };
    dialogAboutCondition.close() //прячем диалоговое окно кондиционеров
  })
}


let forVentilationhbs = document.querySelector('#forVentilationhbs')
let counterOfVentilation = 0
let allQustionOfVentilation = null

if (ventilationButton) {
  ventilationButton.addEventListener('click', async (e) => {
    ventilationButton.style.cssText = 'display: none;';
    dialogAboutVentilation.style.cssText = 'display: flex';
    dialogAboutVentilation.show(); //показываем диалоговое окно вентиляции
    const response = await fetch('/ventilation/question')
    const resp = await response.json()
    allQustionOfVentilation = resp
    const hbsresponce = await fetch('/hbs/first.hbs')
    let HBShtml = await hbsresponce.text();
    let template = Handlebars.compile(HBShtml);
    let html = template({ question: resp[counterOfVentilation].question, arrAnswers: resp[counterOfVentilation].arrAnswers });
    console.log(counterOfVentilation)
    counterOfVentilation++;
    forVentilationhbs.innerHTML = html;
  })
}
if (forVentilationhbs) {
  forVentilationhbs.addEventListener('click', async e => {
    if (e.target.id == 'submitToCondition') {
      e.preventDefault()
      if (counterOfVentilation > allQustionOfVentilation.length - 1) {

        const endResponce = await fetch('/hbs/endOfVentQuiz.hbs')
        let endHBShtml = await endResponce.text();
        let template = Handlebars.compile(endHBShtml);
        let html = template();
        counterOfVentilation = 0;
        console.log(counterOfVentilation)
        forVentilationhbs.innerHTML = html;

        return
      }
      if (counterOfVentilation <= allQustionOfVentilation.length - 1) {
        const hbsresponce = await fetch('/hbs/first.hbs')
        let HBShtml = await hbsresponce.text();
        let template = Handlebars.compile(HBShtml);
        let html = template({ question: allQustionOfVentilation[counterOfVentilation].question, arrAnswers: allQustionOfVentilation[counterOfVentilation].arrAnswers });
        console.log(counterOfVentilation)
        counterOfVentilation++;
        forVentilationhbs.innerHTML = html;
      }
    }
  })
}
if (closeDialogAboutVentilation) {
  closeDialogAboutVentilation.addEventListener('click', async (e) => {
    dialogAboutVentilation.style.cssText = 'display: none;';
    ventilationButton.style.cssText = '';
    forVentilationhbs.innerHTML = '';
    allQustionOfVentilation = null;
    counterOfVentilation = 0;
    dialogAboutVentilation.close() //прячем диалоговое окно вентиляции
  });
}
