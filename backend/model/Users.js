// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
var firebase = require("../firebase/admin");
var firebase2 = require('../firebase/config');
require("firebase/auth");
global.XMLHttpRequest = require("xhr2");

// Firestore
const db = firebase.firestore();
const usersCollection = db.collection("users");


// helper function that checks if a username is taken by another user.
async function usernameTaken(username) {
  console.log('user input: ', username);
  const response = usersCollection.where('username', '==', username);
  const query = await response.get();
  return !query.empty;
}


/* 
 * 
 * 
 *    API for database storage of user info.
 * 
 * 
 */
const UsersAPI = {
  // Profile pic, friends, hugs, chatrooms, corkboard_id
  /*
   * @Param: string - Current User's uid (currentUser.uid)
   */
  createNewUser: async function (uid, username, firstName, lastName) {
    let created = false;
    
    // trim whitespace from username
    username = username.trim().toLowerCase();
    firstName = firstName.trim();
    lastName = lastName.trim();
      
    // Check if username matches [a-z 0-9]
    for (var i = 0; i < username.length; i++) {
      var ch = username.charAt(i);  
      if (!((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || (ch == '.') || (ch == '_') || (ch == '-'))) {
        console.log("Username contained an invalid character");
        created = false;
        return { out : created };
      }
    }

    if(await usernameTaken(username)) {
      console.log("username " + username + " is already taken");
      created = false;
      return { out: created };
    }

    // initialize local object containing initial user values
    const user = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      profile_pic: "",
      day_hug_count: 0,
      current_streak: 0,
    };

    await usersCollection
      .doc(uid)
      .set(user) // set uid document to new user values
      .then(() => {
        console.log(`User created with ID: ${uid}`);
        created = true;
      })
      .catch((error) => {
        console.log(`Error adding user: ${error}`);
        created = false;
      });

    return { out: created };
  },

  // returns users profile information in an object
  // takes in signed-in user
  // TODO: FIX. Look at usersRoutes.js
  getUserProfile: async function (uid) {
    var userDocRef = usersCollection.doc(uid);
    var userProfile;

    // access document
    await userDocRef
      .get()
      .then(function (userDoc) {
        if (userDoc.exists) {
          // set userProfile to retrieved data
          // not sure this is how to retrieve data
          userProfile = {
            username: userDoc.get("username"),
            name: userDoc.get("first_name") + " " + userDoc.get("last_name"),
            profile_pic: userDoc.get("profile_pic"),
          };
        } else {
          // no data under uid
          userProfile = null;
        }
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
        userProfile = null;
      });

    return userProfile;
  },

  // TODO: Need to fix for testing purposes
  // User and UID remains constant throughout expo session
  // In order to reset UID, close metro bundler and npm start again
  // TODO: Develop a SIGNOUT button ASAP
  updateUserProfile: async function (uid, username, firstName, lastName) {
    var success = false;
    const userRef = usersCollection.doc(uid);
    const user = await userRef.get();
    const userData = user.data();
    if (!user.exists) {
      success = false;
    } else {
      if (typeof username !== 'undefined') {
        // trim whitespace from username
        username = username.trim().toLowerCase();
        // Check if username matches [a-z 0-9]
        for (var i = 0; i < username.length; i++) {
          var ch = username.charAt(i);

          if (!((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || (ch == '.') || (ch == '_') || (ch == '-'))) {
            console.log("Username contained an invalid character.");
            success = false;
            return { out : success };
          }
        }

        // case for if a username is already taken.
        if(username == userData.username) {
          console.log("user " + uid + " set their new username to old username")
        } else {
          if(await usernameTaken(username)) {
            console.log("username " + username + " is already taken.")
            success = false;
            return { out : success };
          }
        }
      }

      // initialize local object containing new user values
      const user = {
        username: typeof username !== 'undefined' ?
          username
          :
          userData['username'],
        first_name: typeof firstName !== 'undefined' ?
        firstName.trim() 
        : 
        userData['first_name'],
        last_name: typeof lastName !== 'undefined' ?
        lastName.trim() 
        : 
        userData['last_name'],
      };

      // update document with data
      // await usersCollection
      //   .doc(uid)
      //   .set(user, { merge: true }) // set uid document to new user values
      await userRef // alternative?
        .update(user)
        .then(() => {
          console.log(
            `Updated user with ID: ${uid}\n with data: ${JSON.stringify(user)}`
          );
          success = true;
        })
        .catch((error) => {
          console.log(`Error adding user: ${error}`);
          success = false;
        });
    }

    return { out: success };
  },

  uploadUserProfilePicture: async function (uid, file) {
    var upload_success;
    var update_success;
    // make references
    const userRef = usersCollection.doc(uid);
    var storageRef = firebase2.storage().ref();
    var profilePicRef = storageRef.child(`profile_pictures/${uid}.jpg`);

    // create blob
    const blob = Buffer.from(file.substr(file.indexOf(",") + 1), "base64");

    // setup metadata
    let metadata = {
      contentType: "image/jpeg"
    };

    var url = ""
    // upload to firestore
    await profilePicRef.put(blob, metadata).then(async () => {
      upload_success = true;
    }).catch((error) => {
      upload_success = false;
      console.log("Error uploading user " + uid + "\'s profile picture to Cloud Storage: " + error);
    });

    // get reference URL and store it in the user document
    url = await profilePicRef.getDownloadURL();
    const user = { profile_pic: url };

    // update user's profile_pic field in firestore
    await userRef.update(user).then(() => {
      update_success = true;
    })
    .catch((error) => {
      update_success = false;
      console.log("Error setting profile_pic URL: " + error);
    })

    return { out : upload_success && update_success, url : url };

  },
};


/* 
 * 
 * 
 *    API for hug count retrieval and updates.
 * 
 * 
 */
const HugCountAPI = {
  getUserCounts: async function (uid) {
    var userDocRef = usersCollection.doc(uid);
    var hug_count;

    // access document
    await userDocRef
      .get()
      .then(function (userDoc) {
        if (userDoc.exists) {
          // set userProfile to retrieved data
          // not sure this is how to retrieve data
          hug_count = userDoc.get("day_hug_count");
          streak_count = userDoc.get("current_streak");
        } else {
          // no data under uid
          hug_count = null;
        }
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
        hug_count = null;
      });

    return { hug : hug_count, streak : streak_count };
  },

  increaseHugCount: async function (uid) {
    // retrieve hug and streak count

    var json = this.getUserCounts(uid);
    var hug_count = (await json).hug
    var streak_count = (await json).streak
    var success = false;

    var userDocRef = usersCollection.doc(uid);

    // failed to retrieve hug count
    if (hug_count == null || streak_count == null) {
      return false;
    } else {
      // incrememnt hug count
      hug_count = hug_count + 1;
      // increment streak count
      if (hug_count == 4) {
        streak_count = streak_count + 1;
      }

      // add new data to object
      const user = {
        day_hug_count: hug_count,
        current_streak: streak_count,
      };

      // update document with new data
      await usersCollection
        .doc(uid)
        .update(user) // set uid document to new user values
        .then(() => {
          console.log(`Updated user with ID: ${uid}\n with data: ${user}`);
          success = true;
        })
        .catch((error) => {
          console.log(`Error adding user: ${error}`);
          success = false;
        });
    }
    return { out: success };
  },
};

module.exports = { UsersAPI, HugCountAPI };
