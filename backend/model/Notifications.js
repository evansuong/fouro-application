// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");

const admin = require("firebase-admin");

const { UsersAPI } = require("./Users");
const { HugsAPI } = require("./Hugs");

// Firestore
const db = firebase.firestore();
const users = db.collection("users");
// Firestore
const NotificationsAPI = {
  /* retrieves all the notifications from a certain user
   * @param: user id
   * @return a list of JSON objects with notification information
   */
  getNotifications: async function (uid) {
    let notifications = [];
    let exist = true;

    // Check notifications exist
    var notificationCollection = await users
      .doc(uid)
      .collection("notifications")
      .get()
      .then((sub) => {
        if (sub.docs.length == 0) {
          // console.log("Notifications 32 subcollection does not exist");
          exist = false;
        }
      });

    // No notification collection
    if (!exist) {
      return { notifs: [] };
    }

    notificationCollection = await users.doc(uid).collection("notifications");
    const notificationSnapshot = await notificationCollection
      .orderBy("date_time", "desc")
      .get(); //sort notifications by date/time
    if (notificationSnapshot.empty) {
      // console.log("Notifications 47 No matching documents.");
      return { notifs: notifications };
    }
    //get all the notification_id's
    let notificationData = [];
    notificationSnapshot.forEach((doc) => {
      notificationData = [...notificationData, doc];
    });

    let newUser = {}; //JSON object of user who sent notification
    for (let i = 0; i < notificationData.length; i++) {
      const userId = await notificationData[i].get("user_ref").id;
      const userResponse = await UsersAPI.getUserProfile(userId);
      //if the notification type is a hug
      if ((await notificationData[i].get("type")) == "hug") {
        newUser = {
          friendName: userResponse.name,
          friend_username: userResponse.username,
          date_time: notificationData[i].get("date_time").toDate().toString(),
          friendPfp: userResponse.profile_pic,
          type: notificationData[i].get("type"),
          callback_id: notificationData[i].get("hug_ref").id,
          notification_id: notificationData[i].id,
        };
        //if the notification type is a friend
      } else {
        newUser = {
          friendName: userResponse.name,
          friend_username: userResponse.username,
          date_time: notificationData[i].get("date_time").toDate().toString(),
          friendPfp: userResponse.profile_pic,
          type: notificationData[i].get("type"),
          callback_id: notificationData[i].get("user_ref").id,
          notification_id: notificationData[i].id,
        };
      }
      //push the users notification
      notifications.push(newUser);
    }
    //wrapped in json
    return { notifs: notifications };
  },

  /* Deletes all notifications for a certain user
   * @param: user id and request id
   * @return none
   */
  deleteNotification: function (uid, requestId) {
    var notificationCollection = users.doc(uid).collection("notifications");
    // if (!notificationCollection.exists) {
    //   console.log("Notifications 97 No such document");
    // }
    var user_request_id = notificationCollection.doc(requestId);

    if (user_request_id.get("type") == "hug") {
      HugsAPI.dropHug(uid, requestId, user_request_id.get("hug_ref"));
    }

    user_request_id.delete().then();
  },
};

const RequestsAPI = {
  /* sends a notification when sending a friend request
   * @param: user_id and friend_id
   * @return true
   */
  sendFriendRequest: async function (user_id, friend_id) {
    //Gets the time that the notification is sent
    let dateInSeconds = Math.floor(Date.now() / 1000);
    var dateTime = await new admin.firestore.Timestamp(dateInSeconds, 0);

    // navigates to current users notification collection and updates with
    // the current time, friend_id, and type
    const newFriendCollectionRef = users
      .doc(friend_id)
      .collection("notifications");
    const newFriendRequest = {
      type: "friend",
      date_time: dateTime,
      user_ref: users.doc(user_id), // sender
    };
    await newFriendCollectionRef.add(newFriendRequest);
    return { out: true };
  },
  /* sends a notification when sending a hug to a friend
   * @param: user_id, friend_id and hug_id
   * @return true
   */
  sendHugRequest: async function (user_id, friend_id, hug_id) {
    // Gets the time that the notification is sent
    let dateInSeconds = Math.floor(Date.now() / 1000);
    var dateTime = new admin.firestore.Timestamp(dateInSeconds, 0);

    const newHugCollectionRef = users
      .doc(friend_id)
      .collection("notifications");

    const newHug = {
      type: "hug",
      hug_ref: db.collection("hugs").doc(hug_id),
      date_time: dateTime,
      user_ref: users.doc(user_id), // sender
    };
    await newHugCollectionRef.add(newHug);
    return { out: true };
  },
};

// Export the module
module.exports = { NotificationsAPI, RequestsAPI }; // awaiting to be filled
