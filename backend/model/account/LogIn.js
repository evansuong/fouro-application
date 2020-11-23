// LogIn used to handle Firebase Authentication and logging
// in users
var firebase = require("../../firebase/config");
require("firebase/auth");

const LoginAPI = {
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
};

module.exports = { LoginAPI };
