// SignUp used for signing up users into Firebase Authentication
var firebase = require("../../firebase/config");
require("firebase/auth");
require("firebase/firestore");

const db = firebase.firestore();

const SignupAPI = {
  registerUser: async function (email, password) {
    let registered = false;
    let createdUser;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        createdUser = user;
        registered = true;
        // console.log(`Registered: ${user}`);
      })
      .catch(function (error) {
        console.log("error");
        registered = false;
        var errorCode = error.code;
        var errorMessage = error.message;

        switch (error.code) {
          case "auth/email-already-in-use":
            alert("The email is already in use.");
            break;

          case "auth/invalid-email":
            alert("The email is invalid.");
            break;

          case "auth/weak-password":
            alert("The password is too weak.");
            break;

          case "auth/operation-not-allowed":
          default:
            alert(errorMessage);
            break;
        }

        console.log(error);
      });

    return [registered, createdUser];
  } 
};

module.exports = SignupAPI;
