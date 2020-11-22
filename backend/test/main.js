var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

// Firestore
const db = firebase.firestore();

// Main.js used to run and test functions
var Users = require("../model/Users");
var Hugs = require("../model/Hugs");
// Users
Users.UsersAPI.addUser("username", "first", "last");

// Friends

// Hugs

//updateHugUsers(hugId)
db.collection("hugs")
    .doc("hug1")
    .get()
    .then(function (variable) {
        if (variable.exists) {
            console.log(
                "The Sender's Description:",
                variable.data().sender_description
            );
        } else {
            console.log("No such document!");
        }
    })
    .catch(function (error) {
        console.log("Error getting document:", error);
    });
//Hugs.HugsAPI.createHug()
