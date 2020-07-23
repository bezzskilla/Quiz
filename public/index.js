let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')
// let quizConditionForm = document.querySelector("#quizConditionForm")
let forConditionhbs = document.querySelector('#forConditionhbs')

let submitToCondition = document.querySelector('#submitToCondition')
let counterOfCondition = 0;
let allQustionOfCondition = null

if (conditionButton) {
  conditionButton.addEventListener('click', async e => {
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
    counterOfCondition++;
    forConditionhbs.innerHTML = html;
    console.log(counterOfCondition)
  })
}
forConditionhbs.addEventListener('click', async e => {
  if (e.target.id == 'submitToCondition') {
    e.preventDefault()
    if (counterOfCondition == 5) {
      //прогресс бар на некоторые вопросы
      //отрисовка другой хбс
    }
    if (counterOfCondition < allQustionOfCondition.length) {
      const hbsresponce = await fetch('/hbs/first.hbs')
      let HBShtml = await hbsresponce.text();
      let template = Handlebars.compile(HBShtml);
      let html = template({ question: allQustionOfCondition[counterOfCondition].question, arrAnswers: allQustionOfCondition[counterOfCondition].arrAnswers });
      counterOfCondition++;
      console.log(counterOfCondition)
      // let forConditionhbs = document.querySelector("#forConditionhbs")
      forConditionhbs.innerHTML = html;
    }
    if (counterOfCondition == allQustionOfCondition.length) {


      const endResponce = await fetch('/hbs/endOfQuiz.hbs')
      let endHBShtml = await endResponce.text();
      let template = Handlebars.compile(endHBShtml);
      let html = template();
      counterOfCondition++;
      console.log(counterOfCondition)
      // let forConditionhbs = document.querySelector("#forConditionhbs")
      forConditionhbs.innerHTML = html;


      console.log('sadcvds')
    }

  }
})


if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async e => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.style.cssText = 'display: none;';
    counterOfCondition = 0;
    console.log(counterOfCondition)
    allQustionOfCondition = null
    dialogAboutCondition.close() //прячем диалоговое окно кондиционеров
  })
}


if (ventilationButton) {
  ventilationButton.addEventListener('click', async e => {
    ventilationButton.style.cssText = 'display: none;';
    dialogAboutVentilation.style.cssText = 'display: flex';
    dialogAboutVentilation.show(); //показываем диалоговое окно вентиляции
  })
}
if (closeDialogAboutVentilation) {
  closeDialogAboutVentilation.addEventListener('click', async e => {
    dialogAboutVentilation.style.cssText = 'display: none;';
    ventilationButton.style.cssText = '';
    dialogAboutVentilation.close() //прячем диалоговое окно вентиляции
  })
}
