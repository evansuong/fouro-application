// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
var firebase = require("../firebase/admin");
var firebase2 = require('../firebase/config');
require("firebase/auth");
const fetch = require('node-fetch');


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
   * @Param: string - Current User's uid (currentUser.uid)
   */
  createNewUser: async function (uid, username, firstName, lastName) {
    let created = false;

    // initialize local object containing initial user values
    const user = {
      user_id: uid,
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
      // trim whitespace from username
      username = username.trim();
      firstName = firstName.trim();
      lastName = lastName.trim();

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
    // TODO: this function may not work correctly.
    // create a cloud storage refrence
    // var storageRef = await firebase2
    //   .storage()
    //   .ref("profile_pictures/" + uid + "/" + file._data.name);
    // TODO: This should have a child call I think
    // TODO: NEED TO GET URL https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
    var storageRef = firebase2.storage().ref();
    var profilePicRef = storageRef.child(`profile_pictures/${uid}`)
      // .ref()
      // .child(`${uid}`);
      // .ref(`profile_pictures/${uid}/${file._data.name}`)
      // .child(`profile_pictures/${uid}/${file._data.name}`);

      // console.log('storageRefffff: ', storageRef);
      // console.log('bucket: ', storageRef.bucket);

      // const downloadURL = await storageRef.getDownloadURL();
      // console.log('downloadURL: ', downloadURL);

    // save to cloud storage
    let img = file.dataUrl
    // let img = Object.keys(file)[0]
    console.log(img)
    img = img.replace(/\s/g, '');

    await profilePicRef.putString(img)
    .then((snapshot) => {
      console.log('Uploaded a blob');
    })
    .catch((error) => {
      console.log(error)
    })

   
    console.log('hi')
    // update user's photo URL to the saved cloud storage url
    await usersCollection.doc(uid).update({
      profile_pic: profilePicRef.fullPath,
    });
  },
};

const HugCountAPI = {
  getUserCount: async function (uid) {
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

    var json = this.getUserCount(uid);
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
