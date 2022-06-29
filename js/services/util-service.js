export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId
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