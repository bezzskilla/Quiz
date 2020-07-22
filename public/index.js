let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')

if (conditionButton) {
  conditionButton.addEventListener('click', async e => {
    conditionButton.style.cssText = 'display: none;';
    dialogAboutCondition.show(); //показываем диалоговое окно кондиционеров
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
