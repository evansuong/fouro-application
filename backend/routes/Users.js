// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
// import "firebase/firestore";
// import "firebase/auth";
import firebase from "../firebase/config";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";

// Firestore
export const db = firebase.firestore();
export const users = db.collection("users");

/* TEST Firestore Function
export function addUser(username, first, last) {
  users.doc(username).set({
    first_name: first,
    last_name: last,
  });
} */

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log(`User signed in: ${user}`);
//   }
// })

const UsersAPI = {

  user: firebase.auth().currentUser,

  signInAuthUser: async function(email, password) {
    let loggedin = false;
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      loggedin = true;
    })
    .catch((error) => {
      console.log(`Error while signing in: ${error}`);
      loggedin = false;
    })
    return loggedin;
  },

  createNewUser: function(username, firstName, lastName) {
    // same functionality
    this.updateUserProfile(username, firstName, lastName);
    /*
    this.user.updateProfile({displayName: username});
    users.doc(user.uid).set({
      first_name: firstName,
      last_name: lastName
    });
    */
  },

  uploadUserProfilePicture: function() {    // TODO this function may not work correctly.
    // create a cloud storage refrence
    var storageRef = firebase.storage().ref(user.uid + '/profilePicture/' + file.name);

    // save to cloud storage
    var task = storageRef.put(file);

    // update user's photo URL to the saved cloud storage url
    user.updateProfile({ photoURL: storageRef.getDownloadURL() });
  },

  getUserProfile: function(userId) {
    var userProfile = {
      username: this.user.username,
      firstName: users.get(user.first_name),
      lastName: users.get(user.last_name),
      profPicUrl: this.user.photoURL
    };
    return userProfile;
  },

  updateUserProfile: function(username, firstName, lastName) {
    this.user.updateProfile({displayName: username});
    users.doc(user.uid).set({
      first_name: firstName,
      last_name: lastName
    });
  }
}
 
const HugCountAPI = {
  getUserHugCount: function() {

  },

  getUserHugStreak: function() {

  },

  resetUserHugCount: function() {

  },

  increaseHugCount: function() {
    
  }
}

export default UsersAPI;
