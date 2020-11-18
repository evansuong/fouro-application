// ManageAccount file for handling Firebase User Account Management
import Fire from "../firebase/config";

const ManageAccountAPI = {

    logout: function() {
        
    },

    resetPassword: function() {
        
    },

    deleteAccount: function() {
        var user = Fire.auth().currentUser;

        user.delete()
        .then(function() { return true; })                  // user deleted successfully.
        .catch(function(error) { return false; });          // an error happened.
    },

    checkLoggedIn: function() {
        return Fire.auth().currentUser ? true : false;      // currentUser is null if nobody is signed in.
    }
}