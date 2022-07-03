export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId,
  getLastWeeksDate,
  printTodoToMail,
  expand
}


function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function makeId(length = 8) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


function getLastWeeksDate() {
  return Date.now() - (7 * 24 * 60 * 60 * 1000);
}




function printTodoToMail(todos) {
  const todosArr = todos.map((todo, idx) => `● ${todo.txt}`).join(`\n`);
  return todosArr
}

function expand(){

  document.querySelector('.txt-container').classList.toggle('expand')
  // return object = !object
}
