// SignUp used for signing up users into Firebase Authentication
var firebase = require("../../firebase/config");
require("firebase/auth");
//require("firebase/firestore");

//const db = firebase.firestore();

const SignupAPI = {
  registerUser: function (email, password) {
    let registered = false;
    let createdUser;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        createdUser = user;
        registered = true;
        // console.log(`Registered: ${user}`);
        return firebase.auth().currentUser;
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
        return null;
      });
  } 
};

module.exports = { SignupAPI };
