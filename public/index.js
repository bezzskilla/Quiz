let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')
let counter = 0;

if (conditionButton) {
  conditionButton.addEventListener('click', async e => {
    conditionButton.style.cssText = 'display: none;';
    dialogAboutCondition.show(); //показываем диалоговое окно кондиционеров
    const response = await fetch('/conditioner/question')
    const resp = await response.json()
    console.log(resp[0])
    const hbsresponce = await fetch('/hbs/first.hbs')
    let HBShtml = await hbsresponce.text();
    let template = Handlebars.compile(HBShtml);
    let html = template({ question: resp[counter].question, arrAnswers: resp[counter].arrAnswers });

    let forConditionhbs = document.querySelector("#forConditionhbs")
    forConditionhbs.innerHTML = html;
  })
}
if (closeDialogAboutCondition) {
  closeDialogAboutCondition.addEventListener('click', async e => {
    conditionButton.style.cssText = '';
    dialogAboutCondition.close() //прячем диалоговое окно кондиционеров
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
