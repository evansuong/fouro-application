// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../../firebase/config");
require("firebase/auth");

const ManageAccountAPI = {
  user: firebase.auth().currentUser,

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

  resetPassword: function () {
    if (this.checkLoggedIn()) {
      var auth = firebase.auth();
      var emailAddress = user.email;

      auth
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          return true;
        })
        .catch(function (error) {
          return false;
        });
    }
  },

  deleteAccount: function () {
    if (this.checkLoggedIn()) {
      user
        .delete()
        .then(function () {
          return true;
        }) // user deleted successfully.
        .catch(function (error) {
          return false;
        }); // an error happened.
    }
  },

  checkLoggedIn: function () {
    return user ? true : false; // currentUser is null if nobody is signed in.
  },
  
};

module.exports = ManageAccountAPI;
