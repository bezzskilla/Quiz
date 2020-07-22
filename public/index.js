let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')
let submitToCondition = document.querySelector('#submitToCondition')
let counterOfCondition = 0;
let allQustionOfCondition = null

if (conditionButton) {
  conditionButton.addEventListener('click', async e => {
    conditionButton.style.cssText = 'display: none;';
    dialogAboutCondition.show(); //показываем диалоговое окно кондиционеров
    const response = await fetch('/conditioner/question')
    const resp = await response.json()
    allQustionOfCondition = resp
    const hbsresponce = await fetch('/hbs/first.hbs')
    let HBShtml = await hbsresponce.text();
    let template = Handlebars.compile(HBShtml);
    let html = template({ question: resp[counterOfCondition].question, arrAnswers: resp[counterOfCondition].arrAnswers });
    counterOfCondition++;
    let forConditionhbs = document.querySelector("#forConditionhbs")
    forConditionhbs.innerHTML = html;
  })
}

if (submitToCondition) {
  submitToCondition.addEventListener('click', async e => {
    console.log('sadvc')
    e.preventDefault();
    if (counterOfCondition < allQustionOfCondition.length) {
      //   const responce = await fetch("/conditioner/questionNext",{
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: name, // информация об отмеченных инпутах
      //     }),
      //   });
      // }
      const responce = await fetch("/conditioner/questionNext")
      const hbsresponce = await fetch('/hbs/first.hbs')
      let HBShtml = await hbsresponce.text();
      let template = Handlebars.compile(HBShtml);
      let html = template({ question: allQustionOfCondition[counterOfCondition].question, arrAnswers: allQustionOfCondition[counter].arrAnswers });
      counterOfCondition++;
      let forConditionhbs = document.querySelector("#forConditionhbs")
      forConditionhbs.innerHTML = html;
    }
    if (counterOfCondition >= allQustionOfCondition.length) {
      //последний вопрос
    }
  })
}

if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async e => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.close() //прячем диалоговое окно кондиционеров
    counter = 0;
    allQustionOfCondition = null
  })
}


if (ventilationButton) {
  ventilationButton.addEventListener('click', async e => {
    ventilationButton.style.cssText = 'display: none;';
    dialogAboutVentilation.show(); //показываем диалоговое окно вентиляции
  })
}
if (closeDialogAboutVentilation) {
  closeDialogAboutVentilation.addEventListener('click', async e => {
    ventilationButton.style.cssText = '';
    dialogAboutVentilation.close() //прячем диалоговое окно вентиляции
  })
}
