// SignUp used for signing up users into Firebase Authentication
import firebase from "./config";
import "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeAuth = async (auth) => {
  try {
    const jsonAuth = JSON.stringify(auth)
    await AsyncStorage.setItem("auth", jsonAuth);
  } catch (e) {
    console.log("Error:", e);
  }
}

const AuthAPI = {
  registerUser: async function (email, password) {
    var registered = false;
    var response;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        registered = true;
        response = {
          status: true,
          data: firebase.auth().currentUser.uid,
          message: "success"
        };
      })
      .catch(function (error) {
        registered = false;
        var errorMessage = error.message;
        console.log(errorMessage);
        response = {
          status: false,
          data: null,
          message: error.message
        }
      });

    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },

  loginUser: async function (email, password) {
    var loggedin = false;
    var response;
    await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loggedin = true;
        response = {
          status: true,
          data: firebase.auth().currentUser.uid,
          message: "success"
        }
        storeAuth({email, password});
      })
      .catch(function (error) {
        loggedin = false;
        var errorMessage = error.message;
        console.log('error code', error.code);
        response = {
          status: false,
          data: null,
          message: error.code
        };
      });

      return response;
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
    } else {
      return false;
    }
  },

  checkLoggedIn: function () {
    return firebase.auth().currentUser ? true : false; // currentUser is null if nobody is signed in.
  },
};

export default AuthAPI;
