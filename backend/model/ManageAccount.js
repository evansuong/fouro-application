// ManageAccount file used for managing Firebase Authentication
// and user accounts
var firebase = require("../firebase/admin");
require("firebase/auth");

const ManageAccountAPI = {
  user: firebase.auth().currentUser,

  //update password from within the app.
  changePassword: function(uid, newPassword) {
    var successful;

    admin
      .auth()
      .updateUser(uid, {password: newPassword})
      .then( successful = true )
      .catch((error) => {
        successful = false
        console.log('Error updating password:', error)
      });

      return {"out":successful}
  },

  // delete user account and all corresponding data
  deleteAccount: function (uid) {
    // delete document associated with user
    firebase.firestore.collection("users").doc(uid).delete()
    .then(function() {
      // delete user from authentication
      admin.auth().deleterUser(uid)
      .then(() => {
        console.log("Successfully deleted user")
        return {"out": true}
      })
      .catch((error) => {
        console.log("Error deleting user: ", error)
      })
    }).catch((error) => {
      console.log("Error deleting document associated with user: ", error)
    })
  },
  
};

module.exports = ManageAccountAPI;
