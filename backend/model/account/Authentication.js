// SignUp used for signing up users into Firebase Authentication

import "firebase/auth";
import firebase from "../firebase/config";

const AuthAPI = {
  registerUser: async function (email, password) {
    var registered = false;
    var current_user;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        registered = true;
        current_user = firebase.auth().currentUser;
      })
      .catch(function (error) {
        console.log("error");
        registered = false;
        var errorCode = error.code;
        var errorMessage = error.message;

        switch (error.code) {
          case "auth/email-already-in-use":
            console.log("The email is already in use.");
            break;

          case "auth/invalid-email":
            console.log("The email is invalid.");
            break;

          case "auth/weak-password":
            console.log("The password is too weak.");
            break;

          case "auth/operation-not-allowed":
          default:
            console.log(errorMessage);
            break;
        }

        console.log(error);
        current_user = null;
      });

      return new Promise((resolve, reject) => {
        resolve(current_user);
      });
  },

  loginUser: async function (email, password) {
    var loggedin = false;
    var current_user;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loggedin = true;
        current_user = firebase.auth().currentUser;
      })
      .catch(function (error) {
        loggedin = false;
        var errorMessage = error.message;

        switch (error.code) {
          case "auth/invalid-email":
            console.log("Invalid email.");
            break;

          case "auth/user-disabled":
            console.log("User disabled.");
            break;

          case "auth/user-not-found":
            console.log("User not found.");
            break;

          case "auth/wrong-password":
            console.log("Incorrect password.");
            break;

          default:
            console.log(errorMessage);
            break;
        }

        console.log(error);
        current_user = null;
      });
      return new Promise((resolve, reject) => {
        resolve(current_user);
      });
  },

  logout: function () {
    if (this.checkLoggedIn()) {
      firebase
        .auth()
        .signOut()
        .then(function () {
          return true;
        }) // user signed out successfully.
        .catch(function (error) {
          return false;
        }); // an error happened.
    }
  },

  checkLoggedIn: function () {
    return firebase.auth().currentUser ? true : false; // currentUser is null if nobody is signed in.
  },
  
};

export default AuthAPI;