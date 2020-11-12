import "firebase/firestore";
import "firebase/auth";

import Fire from "../firebase/config";

// Users Class for Creating and Updating Users
export default class Users {
  db = Fire.firestore();
  users = db.collection("users");

  // TEST: Add object to Firestore
  addUser(name) {
    users.doc(name).set({
      first_name: name,
      last_name: "Smith",
    });
  }
}
