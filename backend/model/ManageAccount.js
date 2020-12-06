// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../firebase/admin");
var authentication = require("../firebase/config");
var admin = require("firebase-admin");
require("firebase/auth");

const ManageAccountAPI = {
  
  //update password from within the app.
  changePassword: async function (uid, newPassword) {
    var successful;

    if(uid == null) {
      console.log("No user signed in.");
      return { out: false };
    }

    await admin
      .auth()
      .updateUser(uid, { password: newPassword })
      .then((successful = true))
      .catch((error) => {
        successful = false;
        console.log("Error updating password:", error);
        return { out: successful };
      });

    return { out: successful };
  },


  //"forgot password" to be used outside of the app
  forgotPassword: async function (email) {
    await authentication.auth().sendPasswordResetEmail(email).then(function() {
      response = {
        out: true,
        data: ""
      };
    }).catch(function(error) {
      response = {
        out: false,
        data: error.message
      };
    })

    return response;
  },

  /*
  *
  *   TODO: we currently don't delete files in storage associated with the user
  *         OR remove the user from everyone's friends lists.
  *         this MUST be looked at before we submit.
  * 
  *     - remove the user from everyone's friends lists OR somehow mark them as "deleted user" (probably go in Friends.js)
  *     - 
  * 
  */
  deleteAccount: async function (uid) {
    if(uid == null) {
      console.log("No user in parameter to deleteAccount.");
      return { out: false };
    }

    // delete document associated with user
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .delete()
      .then(async function () {
        // delete user from authentication
        await admin
          .auth()
          .deleteUser(uid)
          .then(() => {
            console.log("Successfully deleted user");
            response = { out: true };
          })
          .catch((error) => {
            console.log("Error deleting user: ", error);
            response = { out: false };
          });
      })
      .catch((error) => {
        console.log("Error deleting document associated with user: ", error);
        response = { out: false };
      });

    return response;
  },
};

module.exports = {ManageAccountAPI};
