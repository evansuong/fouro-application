// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
import "firebase/firestore";
import "firebase/auth";
import Fire from "../firebase/config";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";

// Firestore
//export const db = Fire.firestore();
//export const users = db.collection("users");

// Initialize your Web app as described in the Get started for Web
// Firebase previously initialized using firebase.initializeApp().
export var db = Fire.firestore();
//if (location.hostname === "localhost") {
db.useEmulator("localhost", 8080);
//}
export const users = db.collection("users");

// TEST Firestore Function
export function addUser(username, first, last) {
  users.doc(username).set({
    first_name: first,
    last_name: last,
  });
}
