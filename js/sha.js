var fs = require("fs");
var SHA256 = require("crypto-js/sha256");
var SHA3 = require("crypto-js/sha3");

var mapPasswordSha = require("./mapPasswordSha.json");

let password = "Medfgdfgdfgdfgssage";

console.log(SHA256(password).toString());
console.log("next");
console.log(SHA3(password).toString());
console.log("next");

password = SHA3(password).toString();

let specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "№",
  ";",
  "%",
  ":",
  "?",
  "*",
  "{",
  "}",
  "[",
  "]"
];

let letters = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m"
];

let getRandomSpecialCharacters = () => {
  return specialCharacters[Math.floor(Math.random() * 18) + 1];
};

let generatePasswordMap = () => {
  mapPasswordSha = [];
  for (let key in letters) {
    for (i = 0; i < 100; i++) {
      // буква после цифр
      if (Math.floor(Math.random() * 2) + 1 == 1) {
        if (Math.floor(Math.random() * 2) + 1 == 1) {
          // заменить на большую букву
          mapPasswordSha.push({
            key: i + letters[key],
            value: i + letters[key].toUpperCase() + getRandomSpecialCharacters()
          });
        } else {
          // оставить маленькую букву
          mapPasswordSha.push({
            key: i + letters[key],
            value: i + letters[key] + getRandomSpecialCharacters()
          });
        }
      }
      // буква до цифр
      if (Math.floor(Math.random() * 2) + 1 == 1) {
        if (Math.floor(Math.random() * 2) + 1 == 1) {
          // заменить на большую букву
          mapPasswordSha.push({
            key: letters[key] + i,
            value: letters[key].toUpperCase() + i + getRandomSpecialCharacters()
          });
        } else {
          // оставить маленькую букву
          mapPasswordSha.push({
            key: letters[key] + i,
            value: letters[key] + i + getRandomSpecialCharacters()
          });
        }
      }
    }
  }
  console.log(JSON.stringify(mapPasswordSha));
  fs.writeFile("./mapPasswordSha.json", JSON.stringify(mapPasswordSha), function(
    err
  ) {
    if (err) return console.log(err);
    console.log("Save mapPasswordSha: " + Date.now());
  });
};

//generatePasswordMap();

for (let key in mapPasswordSha) {
  password = password.replace(
    mapPasswordSha[key].key,
    mapPasswordSha[key].value
  );
}

console.log(password);
