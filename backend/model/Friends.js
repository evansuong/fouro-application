// Friends file for Creating, Reading, Updating, and Deleting
// Friends and Friend Management
var admin = require("firebase-admin");
var firebase = require("../firebase/admin");
require("firebase/firestore");

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

// Helper Functions
/**
 * Calculate how long ago the last hug was between user and friend
 * and returns the proper color for the friends list
 * @param {timestamp} last_hug_date
 * @return {string} color
 */
function calculateFriendColor(last_hug_date) {
  // Times
  let dateInSeconds = Math.floor(Date.now() / 1000);
  let hugDateInSeconds = last_hug_date.seconds;

  // Time since last hug in seconds
  let diff = dateInSeconds - hugDateInSeconds;
  // Convert difference to color accordingly
  if (diff > 1296000) {
    // > 15 days
    return COLOR1;
  } else if (diff > 864000) {
    // > 10 days
    return COLOR2;
  } else if (diff > 604800) {
    // > 7 days
    return COLOR3;
  } else if (diff > 432000) {
    // > 5 days
    return COLOR4;
  } else if (diff > 345600) {
    // > 4 days
    return COLOR5;
  } else if (diff > 259200) {
    // > 3 days
    return COLOR6;
  } else if (diff > 172800) {
    // > 2 days
    return COLOR7;
  } else {
    return COLOR8; // < 2 days
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
    user_id: userDoc.get("user_id"),
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
    // Get time in millis, convert to seconds
    let dateInSeconds = Math.floor(Date.now() / 1000);
    // Add friend to user
    usersCollection
      .doc(userId)
      .collection("friends")
      .doc(friendId)
      .set({
        last_hug_date: new admin.firestore.Timestamp(dateInSeconds, 0), // seconds, nanoseconds
        user_uid: usersCollection.doc(friendId),
      });
    // Add user to friend
    usersCollection
      .doc(friendId)
      .collection("friends")
      .doc(userId)
      .set({
        last_hug_date: new admin.firestore.Timestamp(dateInSeconds, 0), // seconds, nanoseconds
        user_uid: usersCollection.doc(userId),
      });
  },

  /**
   * Remove a friend from the user
   * @param {string} userId
   * @param {string} friendId
   */
  removeFriend: function (userId, friendId) {
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

    return { out: status };
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
      return { array: friends };
    }

    let colors = [];
    let friendPromises = [];

    // Get all user_id references from friends
    friendsSnapshot.forEach(async (friendDoc) => {
      friendPromises.push(friendDoc.get("user_id"));
      colors.push(friendDoc.get("last_hug_date"));
    });

    //for (let userRef of friendPromises) {
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
    return { array: friends };
  },
  getFriendProfile: function (userId, friendId) {},
};

const FriendSearchAPI = {
  searchFriends: function (userId, string) {},
  searchUsers: function (userId, string) {},
};

// Export the module
module.exports = { FriendsAPI, FriendSearchAPI };
