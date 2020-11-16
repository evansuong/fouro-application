// Users file for Creating, Reading, Updating, and Deleting Users
import "firebase/firestore";
import "firebase/auth";
import Fire from "../firebase/config";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";

// Firestore
export const db = Fire.firestore();
export const users = db.collection("users");

// TEST: Add object to Firestore
export function addUser(username, first, last) {
  users.doc(username).set({
    first_name: first,
    last_name: last,
  });
}
