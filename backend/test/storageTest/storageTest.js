var firebase = require("../../firebase/config");
require("firebase/firestore");
require("firebase/storage");
global.XMLHttpRequest = require("xhr2");

// Create a root reference
var storageRef = firebase.storage().ref();

var fs = require("fs");

let test;
try {
  const data = fs.readFileSync("./file.base64", "utf8");
  test = data;
} catch (err) {
  console.error(err);
}

// Get only the data of the base64
test = test.substr(test.indexOf(",") + 1);

const testRef = storageRef.child("test.jpg");

//convert base64 to buffer / blob
const blob = Buffer.from(test, "base64");

// Assign metadata
let metadata = {
  contentType: "image/jpeg",
};

testRef.put(blob, metadata).then(() => {
  console.log("Success!");
});
