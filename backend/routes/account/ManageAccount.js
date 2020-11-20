// ManageAccount file for handling Firebase User Account Management
import Fire from "../firebase/config";

const ManageAccountAPI = {

    user: Fire.auth().currentUser,

    logout: function() {
        if (this.checkLoggedIn()) {
            Fire.auth().signOut()
            .then(function() { return true; })                  // user signed out successfully.
            .catch(function(error) { return false; });          // an error happened.
        }
    },

    resetPassword: function() {
        if (this.checkLoggedIn()) {
            var auth = firebase.auth();
            var emailAddress = user.email;
    
            auth.sendPasswordResetEmail(emailAddress)
            .then(function() { return true; })
            .catch(function(error) { return false; });
        }
    },

    deleteAccount: function() {
        if (this.checkLoggedIn()) {
            user.delete()
            .then(function() { return true; })                  // user deleted successfully.
            .catch(function(error) { return false; });          // an error happened.
        }
    },

    checkLoggedIn: function() {
        return user ? true : false;      // currentUser is null if nobody is signed in.
    }
}