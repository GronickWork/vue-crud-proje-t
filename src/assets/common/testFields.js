export default function testFields(mark) {
  if(mark === 'delete') {return;}
  const title = document.forms.fCrud.elements.title.value;
  if(!title) {
    alert('Не возможно записать задачу!\nПоле "Описание задачи" не заполнено!!'); 
    return 'none';
  }
  const idUser = document.forms.fCrud.elements.userId.value;
  if(idUser === "") {
    alert('Не возможно записать задачу!\nПоле "id исполнителя" не заполнено!!'); 
    return 'none';}
}
