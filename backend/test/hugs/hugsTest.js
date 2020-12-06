var firebase = require("../../firebase/config");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

// xml http request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

// Firestore
const db = firebase.firestore();

// Main.js used to run and test functions
var Users = require("../../model/Users");
var Hugs = require("../../model/Hugs");
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

// getHugById()
// async function testGetHugById(hugId) {
//     hug1 = await Hugs.ViewHugAPI.getHugById(hugId);
//     console.log(hug1);
// }
// testGetHugById("hug1");

// getUserHugs()
// async function testGetUserHugs(hugId) {
//     userHugs = await Hugs.ViewHugAPI.getUserHugs(hugId);
//     console.log(userHugs);
// }
// testGetUserHugs("example@email.com");

// getSharedHugs()
async function testGetSharedHugs(currUser, targetUser) {
    sharedHugs = await Hugs.ViewHugAPI.getSharedHugs(currUser, targetUser);
    console.log(sharedHugs);
}
// console.log(
//     "-------------------example@email.com & otherguy@email.com--------------------"
// );
testGetSharedHugs("example@email.com", "otherguy@email.com");
//testGetSharedHugs("otherguy@email.com", "example@email.com");
//output should be hug1 and hug_2

// console.log(
//     "-------------------gary@example.com & otherguy@email.com--------------------"
// );
//testGetSharedHugs("gary@email.com", "otherguy@email.com");
//output should be hug_3

//loop through images? Need cloud function?
//db.doc("hugs/hug1").
//Hugs.HugsAPI.createHug()
