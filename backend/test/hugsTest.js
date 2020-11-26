var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

// xml http request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

// Firestore
const db = firebase.firestore();

// Main.js used to run and test functions
var Users = require("../model/Users");
var Hugs = require("../model/Hugs");
// Users
//Users.UsersAPI.addUser("username", "first", "last");

// Friends

// Hugs

// Get a field from top level hugs collection
// db.collection("hugs")
//     .doc("hug1")
//     .get()
//     .then(function (variable) {
//         if (variable.exists) {
//             console.log(
//                 "The Sender's Description:",
//                 variable.data().sender_description
//             );
//         } else {
//             console.log("No such document!");
//         }
//     })
//     .catch(function (error) {
//         console.log("Error getting document:", error);
//     });

//loop through all of a user's user_hugs
// db.collection("users")
//     .doc("example@email.com")
//     .collection("user_hugs")
//     .get()
//     .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//             //doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, "=>", doc.data());
//         });
//     });

// getUserHugs()
// var results = [];
// db.collection("users")
//     .doc("example@email.com")
//     .collection("user_hugs")
//     .get()
//     .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//             results = [...results, doc.data()];
//         });
//         console.log(results); //ADD RETURN HERE
//     });

// deleteImage()
Hugs.UpdateHugAPI.deleteImage(
    "https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb"
);

//loop through images? Need cloud function?
//db.doc("hugs/hug1").
//Hugs.HugsAPI.createHug()
