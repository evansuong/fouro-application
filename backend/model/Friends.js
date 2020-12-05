// Friends file for Creating, Reading, Updating, and Deleting
// Friends and Friend Management
var admin = require("firebase-admin");
var firebase = require("../firebase/admin");
require("firebase/firestore");

// Backend function imports
// var Hugs = require("./Hugs");

// Firestore
const db = firebase.firestore();
const usersCollection = db.collection("users");

// Friend Color Constants
const COLOR1 = "#FE5951"; // > 15 days
const COLOR2 = "#FC6C58"; // > 10 days
const COLOR3 = "#FA7D5D"; // > 7 days
const COLOR4 = "#F88E63"; // > 5 days
const COLOR5 = "#F69D68"; // > 4 days
const COLOR6 = "#EFBA7C"; // > 3 days
const COLOR7 = "#EFCF7C"; // > 2 days
const COLOR8 = "#EFD67C"; // < 2 days

// Time Constants
const SECOND = 1000;
const DAY15 = 1296000;
const DAY12 = 864000;
const DAY7 = 604800;
const DAY5 = 432000;
const DAY4 = 345600;
const DAY3 = 259200;
const DAY2 = 172800;

// Helper Functions
/**
 * Calculate how long ago the last hug was between user and friend
 * and returns the proper color for the friends list
 * @param {timestamp} last_hug_date
 * @return {string} color
 */
function calculateFriendColor(last_hug_date) {
  // Times
  let dateInSeconds = Math.floor(Date.now() / SECOND);
  let hugDateInSeconds = last_hug_date.seconds;

  // Time since last hug in seconds
  let diff = dateInSeconds - hugDateInSeconds;
  // Convert difference to color accordingly
  if (diff > DAY15) {
    // > 15 days
    return COLOR1;
  } else if (diff > DAY12) {
    // > 10 days
    return COLOR2;
  } else if (diff > DAY7) {
    // > 7 days
    return COLOR3;
  } else if (diff > DAY5) {
    // > 5 days
    return COLOR4;
  } else if (diff > DAY4) {
    // > 4 days
    return COLOR5;
  } else if (diff > DAY3) {
    // > 3 days
    return COLOR6;
  } else if (diff > DAY2) {
    // > 2 days
    return COLOR7;
  } else {
    return COLOR8; // <= 2 days
  }
}
/**
 * Helper function to get user information out of a Firebase document
 * and return as a friend object
 * @param {Document} userDoc
 * @return {JSON} friend object
 */
function userFill(userDoc) {
  let friend = {
    user_id: userDoc.id,
    name: userDoc.get("first_name") + " " + userDoc.get("last_name"),
    username: userDoc.get("username"),
    profile_pic: userDoc.get("profile_pic"), // Storage
  };
  return friend;
}

// Exported APIs
const FriendsAPI = {
  /**
   * Add a new friend to the user
   * @param {string} userId
   * @param {string} friendId
   */
  addFriend: function (userId, friendId) {
    // Add friend to user
    usersCollection
      .doc(userId)
      .collection("friends")
      .doc(friendId)
      .set({
        // Priority new friend to top of list
        last_hug_date: new admin.firestore.Timestamp(0, 0), // seconds, nanoseconds
        user_id: usersCollection.doc(friendId),
      });
    // Add user to friend
    usersCollection
      .doc(friendId)
      .collection("friends")
      .doc(userId)
      .set({
        // Priority new friend to top of list
        last_hug_date: new admin.firestore.Timestamp(0, 0), // seconds, nanoseconds
        user_id: usersCollection.doc(userId),
      });
  },

  /**
   * Remove a friend from the user
   * @param {string} userId
   * @param {string} friendId
   */
  removeFriend: function (userId, friendId) {
    // Remove friend from user
    usersCollection
      .doc(userId)
      .collection("friends")
      .doc(friendId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    // Remove user from friend
    usersCollection
      .doc(friendId)
      .collection("friends")
      .doc(userId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  },

  /**
   * Check the status of the friend to the user
   * @param {string} userId
   * @param {string} friendId
   * @returns {JSON} friend status
   */
  getFriendStatus: async function (userId, friendId) {
    let status;

    // If Friend
    // if a document by the name of friendId exists
    let friendRef = usersCollection
      .doc(userId)
      .collection("friends")
      .doc(friendId);

    await friendRef
      .get()
      .then(async (doc) => {
        // Friend is found
        if (doc.exists) {
          console.log("HI");
          status = "friend";
        } else {
          // If Pending
          // Search through all the friend's notifications for a user_id that matches userId
          let friendNotificationsRef = usersCollection
            .doc(friendId)
            .collection("notifications");
          let query = await friendNotificationsRef
            .where("user_id", "==", usersCollection.doc(userId))
            .get();

          // Check if any matching results
          if (!query.empty) {
            // Currently Pending
            status = "pending";
          } else {
            // No notification exists
            status = "stranger";
          }
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    return { status: status };
  },

  /**
   * Get all the User's friends and return
   * @param {String} userId
   * @return {JSON} All the friends in an array
   */
  getFriendsList: async function (userId) {
    let friends = []; // friends array
    let friendsRef = usersCollection.doc(userId).collection("friends");
    const friendsSnapshot = await friendsRef.orderBy("last_hug_date").get();
    // No friends
    if (friendsSnapshot.empty) {
      console.log("No matching documents.");
      return { friends: friends };
    }

    let colors = [];
    let friendPromises = [];

    // Get all user_id references from friends
    await friendsSnapshot.forEach(async (friendDoc) => {
      friendPromises.push(friendDoc.get("user_id"));
      console.log(friendDoc.get("user_id"));
      colors.push(friendDoc.get("last_hug_date"));
    });

    // Resolve promises
    for (let i = 0; i < friendPromises.length; i++) {
      // Get the actual userDocument from the friend stored reference
      let userDoc = await friendPromises[i].get();
      if (!userDoc.exists) {
        console.log("No such document!");
      } else {
        // Helper function fill
        let friend = userFill(userDoc);
        friend.color = calculateFriendColor(colors[i]);
        // Add friend object to array
        friends.push(friend);
      }
    }
    // Return the friends
    return { friends: friends };
  },

  /**
   * Get all shared hugs between user and friend
   * @param {string} userId
   * @param {string} friendId
   */
  getFriendProfile: function (userId, friendId) {
    // return Hugs.ViewHugAPI.getSharedHugs(userId, friendId);
  },
};

const FriendSearchAPI = {
  /**
   * Search through the user's friends for all friend's first_name
   * that match the query string
   * @param {string} userId
   * @param {string} query
   */
  searchFriends: async function (userId, query) {
    // Clean and format input query
    let nameQuery = query.trim();
    nameQuery =
      nameQuery.charAt(0).toUpperCase() + nameQuery.slice(1).toLowerCase();

    let userFriendsRef = usersCollection.doc(userId).collection("friends");

    let friendPromises = [];
    // Search through user's friends
    const friendsSnapshot = await userFriendsRef.get();
    // No friends
    if (friendsSnapshot.empty) {
      console.log("No matching documents.");
      return { friends: friends };
    }
    // Get all user_id references from friends
    friendsSnapshot.forEach(async (friendDoc) => {
      friendPromises.push(friendDoc.get("user_id"));
    });

    let friends = [];
    // Resolve Promises and get user documents
    for (let i = 0; i < friendPromises.length; i++) {
      // Get the actual userDoc from the friend stored reference
      let userDoc = await friendPromises[i].get();
      if (!userDoc.exists) {
        console.log("No such document!");
      } else if (userDoc.get("first_name") === nameQuery) {
        // If first_name matches nameQuery
        let friend = userFill(userDoc);
        // Add friend object to array
        friends.push(friend);
      }
    }
    return { friends: friends };
  },

  /**
   * Search through all users for users' usernames that match
   * the query username
   * @param {string} userId
   * @param {string} query
   */
  searchUsers: async function (query) {
    // Clean and format input query
    let usernameQuery = query.trim();
    usernameQuery = usernameQuery.toLowerCase();

    let user;
    // Get all user matches in firestore
    let userSnapshot = await usersCollection
      .where("username", "==", usernameQuery)
      .get();
    // No matches
    if (userSnapshot.empty) {
      console.log("No matching documents.");
      return { user: "none" };
    }
    // Go through the snapshot
    userSnapshot.forEach((userDoc) => {
      user = userFill(userDoc);
    });
    return { user: user };
  },
};

// Export the module
module.exports = { FriendsAPI, FriendSearchAPI };
