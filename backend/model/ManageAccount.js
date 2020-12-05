// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../firebase/admin");
var authentication = require("../firebase/config");
var admin = require("firebase-admin");
require("firebase/auth");

const ManageAccountAPI = {
  
  //update password from within the app.
  changePassword: function (uid, newPassword) {
    var successful;

    admin
      .auth()
      .updateUser(uid, { password: newPassword })
      .then((successful = true))
      .catch((error) => {
        successful = false;
        console.log("Error updating password:", error);
      });

    return { out: successful };
  },


  //"forgot password" to be used outside of the app/
  forgotPassword: function (email) {
    authentication.sendPasswordResetEmail(email).then(function() {
      response = {
        status: true,
        data: ""
      };
    }).catch(function(error) {
      response = {
        status: false,
        data: error.message
      };
    })

    return response;
  },






  // delete user account and all corresponding data
  deleteAccount: function (uid) {
    // delete document associated with user
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .delete()
      .then(function () {
        // delete user from authentication
        admin
          .auth()
          .deleteUser(uid)
          .then(() => {
            console.log("Successfully deleted user");
            return { out: true };
          })
          .catch((error) => {
            console.log("Error deleting user: ", error);
          });
      })
      .catch((error) => {
        console.log("Error deleting document associated with user: ", error);
      });
  },
};

module.exports = ManageAccountAPI;
