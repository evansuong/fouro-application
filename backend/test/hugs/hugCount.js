const Hugs = require("../../model/Hugs");
const Users = require("../../model/Users");

//Hugs.UpdateHugAPI.updateUserHugCount("hug1");

var fs = require("fs");

let test;
try {
  const data = fs.readFileSync("../storageTest/file.base64", "utf8");
  test = data;
} catch (err) {
  console.error(err);
}
//console.log(test);

let death = [test, test, test];
let hi = [];

/*
Hugs.HugsAPI.createHug(
  "example@email.com",
  "otherguy@email.com",
  "Sup Dude",
  hi
);

Hugs.UpdateHugAPI.respondToHug(
  "outerguy@email.com",
  "4GO35lG4sEpRHyZkvcfG",
  "yay",
  []
)
*/
Hugs.UpdateHugAPI.updateUserHugCount("hug1");
