// ManageAccount file for handling Firebase User Account Management
import Fire from "../firebase/config";

const ManageAccountAPI = {

    user: Fire.auth().currentUser,

    logout: function() {
        
    },

    resetPassword: function() {
        
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