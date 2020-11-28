// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../../firebase/config");
require("firebase/auth");

const ManageAccountAPI = {
  user: firebase.auth().currentUser,

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
  
};

module.exports = ManageAccountAPI;
