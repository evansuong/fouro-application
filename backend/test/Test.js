// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
import Fire from "../firebase/config";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";

// Testing
const TEST = true;

// Firestore
var db = Fire.firestore();
var auth = Fire.auth();

var users = db.collection("users");

const UsersAPI = {
  addUser: function (username, first, last) {
    users.doc(username).set({
      first_name: first,
      last_name: last,
    });
  },
};

export default UsersAPI;
