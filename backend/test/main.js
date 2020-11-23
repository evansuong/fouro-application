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

// loop through all of a user's user_hugs
db.collection("users")
    .doc("example@email.com")
    .collection("user_hugs")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "=>", doc.data());
        });
    });

//loop through images? Need cloud function?
//db.doc("hugs/hug1").
//Hugs.HugsAPI.createHug()
