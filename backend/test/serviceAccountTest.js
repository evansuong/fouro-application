// Purely for testing the new config file
var firebase = require("../firebase/config");
//require("firebase/firestore");

const db = firebase.firestore();
const usersCollection = db.collection("users");

// The best dummy function ever
function addUser(username, first, last) {
  usersCollection.add({
    username: username,
    first_name: first,
    last_name: last,
  });
}

addUser("testTerry", "terry", "feng");
