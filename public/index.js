let conditionButton = document.querySelector('#conditionButton')
let ventilationButton = document.querySelector('#ventilationButton')
let dialogAboutCondition = document.querySelector('#dialogAboutCondition')
let dialogAboutVentilation = document.querySelector('#dialogAboutVentilation')
let closeDialogAboutCondition = document.querySelector('#closeDialogAboutCondition')
let closeDialogAboutVentilation = document.querySelector('#closeDialogAboutVentilation')

conditionButton.addEventListener('click', async e => {
  dialogAboutCondition.show(); //показываем диалоговое окно кондиционеров
})
closeDialogAboutCondition.addEventListener('click', async e => {
  dialogAboutCondition.close() //прячем диалоговое окно кондиционеров
})

ventilationButton.addEventListener('click', async e => {
  dialogAboutVentilation.show(); //показываем диалоговое окно вентиляции
})
closeDialogAboutVentilation.addEventListener('click', async e => {
  dialogAboutVentilation.close() //прячем диалоговое окно вентиляции
})
