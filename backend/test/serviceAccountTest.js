/*
 * This file is PURELY for testing to see if Admin SDK Works. This is not production
 * code nor is this for testing actual functions
 */
var firebase = require("../firebase/admin");
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
