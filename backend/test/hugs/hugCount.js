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
  death
);
*/

/*
Hugs.UpdateHugAPI.respondToHug(
  "otherguy@email.com",
  "BSn6aZURanRdzSJGyNdb",
  "IT WORKS",
  death
);
*/
//Hugs.UpdateHugAPI.updateUserHugCount("hug1");
Hugs.HugsAPI.dropHug("otherguy@email.com", "3J6wimkh0Pn3vJPh3eCt");
