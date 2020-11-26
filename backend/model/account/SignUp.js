// SignUp used for signing up users into Firebase Authentication

var firebase = require("../../firebase/config");
require("firebase/auth");

const SignupAPI = {
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
  } 
};

module.exports = { SignupAPI };
