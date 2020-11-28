// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
var firebase = require("../firebase/config");
// require("firebase/firestore");
// require("firebase/auth");
import "firebase/firestore";
import "firebase/auth";
// Firestore
const db = firebase.firestore();
const usersCollection = db.collection("users");

const UsersAPI = {
  // FOR TESTING PURPOSES ONLY, NOT A FUNCTION
  addUser: function (username, first, last) {
    usersCollection.doc(username).set({
      first: first,
      last: last,
    });
  },

  // Profile pic, friends, hugs, chatrooms, corkboard_id
  /*
   * @Param: firebase::auth::User current_user - Current signed in user from firebase authentication
   */
  createNewUser: async function (current_user) {
    let created = false;

    // initialize local object containing initial user values
    const user = {
      user_id: current_user.uid,
      username: "",
      first_name: "",
      last_name: "",
      profile_pic: "",
      day_hug_count: 0,
      current_streak: 0
    };

    await usersCollection
      .doc(current_user.uid)
      .set(user) // set uid document to new user values
      .then(() => {
        console.log(`User created with ID: ${current_user.uid}`);
        created = true;
      })
      .catch((error) => {
        console.log(`Error adding user: ${error}`);
        created = false;
      });

    return created;
  },

  // returns users profile information in an object
  // takes in signed-in user 
  getUserProfile: async function (current_user) {

    var userDocRef = usersCollection.doc(current_user.uid);
    var userProfile;

    // access document
    await userDocRef.get().then(function(userDoc) {
      if (userDoc.exists) {
        // set userProfile to retrieved data
        // not sure this is how to retrieve data
        userProfile = {
          username:     userDoc.get("username"),
          first_name:   userDoc.get("first_name"),
          last_name:    userDoc.get("last_name"),
          profile_pic: userDoc.get("profile_pic")
        };
      } else {
        // no data under uid
        userProfile = null;
      }

    }).catch(function(error) {
      console.log("Error getting document: ", error);
      userProfile = null;
    });

    return new Promise((resolve,reject) => resolve(userProfile));

  },

  // TODO: Need to fix for testing purposes
  // User and UID remains constant throughout expo session
  // In order to reset UID, close metro bundler and npm start again
  // TODO: Develop a SIGNOUT button ASAP
  updateUserProfile: async function (current_user, username, firstName, lastName) {
    var success = false;

    // trim whitespace from username
    username = username.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();

    // initialize local object containing new user values
    const user = {
      first_name: firstName,
      last_name: lastName,
      username: username,
    });
  },


    // update document with data
    await usersCollection
      .doc(current_user.uid)
      .update(user) // set uid document to new user values
      .then(() => {
        console.log(`Updated user with ID: ${current_user.uid}\n with data: ${JSON.stringify(user)}`);
        success = true;
      })
      .catch((error) => {
        console.log(`Error adding user: ${error}`);
        success = false;
      });

      return success;
  },

  uploadUserProfilePicture: async function (current_user, file) {
    // TODO this function may not work correctly.
    // create a cloud storage refrence
    var storageRef = firebase
      .storage()
      .ref(user.uid + "/profilePicture/" + file.name);

    // save to cloud storage
    var task = storageRef.put(file);

    // update user's photo URL to the saved cloud storage url
    await usersCollection
      .doc(current_user.uid)
      .set({
        profile_pic:  storageRef
      });
  },

  /*usernameTaken: async function(username) {
    console.log('user input: ', username);
    const response = users.where('username', '==', username);
    const query = await response.get();
    return !query.empty;
  }*/
};
 
const HugCountAPI = {
  getUserHugCount: function (current_user) {
    var userDocRef = usersCollection.doc(current_user.uid);
    var hug_count;

    // access document
    userDocRef.get().then(function(userDoc) {
      if (userDoc.exists) {
        // set userProfile to retrieved data
        // not sure this is how to retrieve data
        hug_count = userDoc.get("day_hug_count");
      } else {
        // no data under uid
        hug_count = null;
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
      hug_count = null;
    });

    return hug_count;
  },


  getUserHugStreak: function (current_user) {
    var userDocRef = usersCollection.doc(current_user.uid);
    var streak_count;

    // access document
    userDocRef.get().then(function(userDoc) {
      if (userDoc.exists) {
        // set userProfile to retrieved data
        // not sure this is how to retrieve data
        streak_count = userDoc.get("current_streak");
      } else {
        // no data under uid
        streak_count = null;
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
      streak_count = null;
    });

    return streak_count;
  },

  increaseHugCount: async function (current_user) {
    // retrieve hug and streak count
    var hug_count = this.getUserHugCount(current_user);
    var streak_count = this.getUserHugStreak(current_user);
    var success = false;

    var userDocRef = usersCollection.doc(current_user.uid);
    
    // failed to retrieve hug count
    if (hug_count == null || streak_count == null) {
      return false;
    }
    else {
      // incrememnt hug count
      hug_count = hug_count + 1;
      // increment streak count
      if (hug_count == 4) {
        streak_count = streak_count + 1;
      }

      // add new data to object
      const user = {
        day_hug_count: hug_count,
        current_streak: streak_count
      };

      // update document with new data
      await usersCollection
        .doc(current_user.uid)
        .update(user) // set uid document to new user values
        .then(() => {
          console.log(`Updated user with ID: ${current_user.uid}\n with data: ${user}`);
          success = true;
        })
        .catch((error) => {
          console.log(`Error adding user: ${error}`);
          success = false;
        });
    }
    return success;
  },
};

module.exports = { UsersAPI, HugCountAPI };
