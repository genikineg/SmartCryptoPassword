let fs = require("fs");
let SHA3 = require("crypto-js/sha3");
let numberHash = function(s) {
  return s.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
let config = require("./generatePasswordMap.config.json");
let mapPassword = require(config.mapFileDir + "passwordMap.json");
let secretPasswordHash = 0;
for (let i = 0; i < 100; i++) {
  secretPasswordHash =
    secretPasswordHash + "" + numberHash(config.secretPassword) * i;
}
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
let removeLastDigits = (x, n) => {
  return (x - (x % Math.pow(10, n))) / Math.pow(10, n);
};

let getSpecialCharacters = n => {
  for (let i = 0; i < 3; i++) {
    if (n > specialCharacters.length - 1) {
      n = removeLastDigits(n, 1);
    } else {
      break;
    }
  }
  if (typeof specialCharacters[Number(n)] !== "undefined") {
    return specialCharacters[Number(n)];
  } else {
    return specialCharacters[0];
  }
};
let generatePasswordMap = () => {
  mapPassword = [];
  for (let key in letters) {
    for (let i = 0; i < 10; i++) {
      if (
        Number(
          secretPasswordHash[i] +
            secretPasswordHash[i + 1] +
            secretPasswordHash[i + 2]
        ) > 500
      ) {
        if (
          Number(
            secretPasswordHash[i] +
              secretPasswordHash[i + 1] +
              secretPasswordHash[i + 2]
          ) %
            2 ==
          0
        ) {
          mapPassword.push({
            key: i + letters[key],
            value:
              i +
              letters[key].toUpperCase() +
              getSpecialCharacters(
                Number(
                  secretPasswordHash[i] +
                    secretPasswordHash[i + 1] +
                    secretPasswordHash[i + 2]
                )
              )
          });
        } else {
          mapPassword.push({
            key: i + letters[key],
            value:
              i +
              letters[key] +
              getSpecialCharacters(
                Number(
                  secretPasswordHash[i] +
                    secretPasswordHash[i + 1] +
                    secretPasswordHash[i + 2]
                )
              )
          });
        }
      } else {
        if (
          Number(
            secretPasswordHash[i] +
              secretPasswordHash[i + 1] +
              secretPasswordHash[i + 2]
          ) %
            2 ==
          0
        ) {
          mapPassword.push({
            key: letters[key] + i,
            value:
              letters[key].toUpperCase() +
              i +
              getSpecialCharacters(
                Number(
                  secretPasswordHash[i] +
                    secretPasswordHash[i + 1] +
                    secretPasswordHash[i + 2]
                )
              )
          });
        } else {
          mapPassword.push({
            key: letters[key] + i,
            value:
              letters[key] +
              i +
              getSpecialCharacters(
                Number(
                  secretPasswordHash[i] +
                    secretPasswordHash[i + 1] +
                    secretPasswordHash[i + 2]
                )
              )
          });
        }
      }
    }
  }
  //console.log(JSON.stringify(mapPassword));
  fs.writeFile(
    config.mapFileDir + "passwordMap.json",
    JSON.stringify(mapPassword),
    function(err) {
      if (err) return console.log(err);
      console.log("Save mapPassword: " + Date.now());
    }
  );
};
generatePasswordMap();
let password = SHA3("password").toString();
for (let key in mapPassword) {
  password = password.replace(mapPassword[key].key, mapPassword[key].value);
}
console.log(password);
