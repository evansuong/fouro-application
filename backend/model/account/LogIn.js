// LogIn used to handle Firebase Authentication and logging
// in users
var firebase = require("../../firebase/config");
require("firebase/auth");

const LoginAPI = {
  loginUser: function (email, password) {
    let loggedin = false;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loggedin = true;
        return firebase.auth().currentUser;
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
        return null;
      });
  },
};

module.exports = { LoginAPI };
