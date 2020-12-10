// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../firebase/admin");
var authentication = require("../firebase/config");
var admin = require("firebase-admin");
require("firebase/auth");

const ManageAccountAPI = {
  
  //update password from within the app.
  changePassword: async function (uid, newPassword) {
    if(uid == null) {
      return { out: false, data: "No user signed in." };
    }

    await admin.auth().updateUser(uid, { password: newPassword }).then(function () {
      response = {
        out: true,
        data: ""
      };
    }).catch(function(error) {
      response = {
        out:false,
        data: error.message
      };
    })

    return response;
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
      return { out: false, data: "No user in parameter to deleteAccount." };
    }

    // delete document associated with user
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .delete()
      .then(async function () {
        response = { 
          out: true, 
          data: "Successfully deleted user from firestore... " 
        };
      })
      .catch((error) => {
        response = { 
          out: false, 
          data: error.message
        };
      });

      // delete user from authentication.  output is combined with that of firestore deletion output
    await admin
      .auth()
      .deleteUser(uid)
      .then(async function () {
        response2 = { 
          out: response.out && true,
          data: response.data + "Successfully deleted user from auth"
        };
      })
      .catch((error) => {
        response2 = { 
          out: response.out && false,
          data: response.data + error.message
        };
      });

    return response2;
  },
};

module.exports = {ManageAccountAPI};
