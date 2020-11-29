// Friends file for Creating, Reading, Updating, and Deleting
// Friends and Friend Management
var admin = require("firebase-admin");
var firebase = require("../firebase/admin");
require("firebase/firestore");

// Firestore
const db = firebase.firestore();
const usersCollection = db.collection("users");

// Helper Functions
//calculateFriendColor(hug_count);

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
      .then();
    // For testing output
    /*
    function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    */
  },

  /**
   * Check the status of the friend to the user
   * @param {string} userId
   * @param {string} friendId
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

  getFriendsList: function (userId) {},
  getFriendProfile: function (userId, friendId) {},
};

const FriendSearchAPI = {
  searchFriends: function (userId, string) {},
  searchUsers: function (userId, string) {},
};

// Export the module
module.exports = { FriendsAPI, FriendSearchAPI };
