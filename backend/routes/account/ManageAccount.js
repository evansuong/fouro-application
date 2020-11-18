// ManageAccount file for handling Firebase User Account Management
import Fire from "../firebase/config";

const ManageAccountAPI = {

    user: Fire.auth().currentUser,

    logout: function() {
        Fire.auth().signOut();
    },

    resetPassword: function() {
        var auth = firebase.auth();
        var emailAddress = user.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
    },

    deleteAccount: function() {
        user.delete()
        .then(function() { return true; })                  // user deleted successfully.
        .catch(function(error) { return false; });          // an error happened.
    },

    checkLoggedIn: function() {
        return user ? true : false;      // currentUser is null if nobody is signed in.
    }
}