import "firebase/firestore";
import "firebase/auth";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";
import Fire from "../firebase/config";

// Users File for Creating, Reading, Updating, and Deleting Users
export const db = Fire.firestore();
export const users = db.collection("users");

// TEST: Add object to Firestore
export function addUser(username, first, last) {
  users.doc(username).set({
    first_name: first,
    last_name: last,
  });
}


// const UsersAPI = {
//   addUser: function(username, first, last) {
//     users.doc(username).set({
//       first_name: first,
//       last_name: last,
//     });
//   },

// }

// export default UsersAPI;
// import UsersAPI from 'backend/routes/users';
// await UsersAPI.addUser(username, first, last)

