var firebase = require("../../firebase/config");
require("firebase/firestore");
require("firebase/storage");
global.XMLHttpRequest = require("xhr2");

// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var hiRef = storageRef.child("hi.png");

// Create a reference to 'images/mountains.jpg'
var hiImagesRef = storageRef.child("test/hi.png");

let message = "Hi everyone!";
hiImagesRef.put(data).then(function (snapshot) {
  console.log("success");
});
