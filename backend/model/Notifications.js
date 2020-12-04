// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");


// Firestore
const db = firebase.firestore();
const users = db.collection("users");
// Firestore
const NotificationsAPI = {
    getNotifications: async function (uid) {
        // UNPAGINATED
        var notificationCollection = users
          .doc(uid)
          .collection("notifications")
          .orderBy("date_time")
        const notificationSnapshot = await notificationCollection.get();
        let notifications = [];
        notificationSnapshot.forEach(doc => {
          notifications = [...notifications, doc.data()];
        });
        return notifications;
    },

    deleteNotification: function (requestId) {
        requestId.delete().then();
    },
};

const RequestsAPI = {
    sendFriendRequest: async function (user_id, friend_id) {
        //Gets the time that the notification is sent
        var dateTime = new Date();

        // navigates to current users notification collection and updates with 
        // the current time, friend_id, and type
        const newFriendCollectionRef = 
          users.doc(friend_id).collection('notifications').doc(`${user_id}`);
        const newFriendRequest = {
          type : "friend",
          date_time : dateTime,
          user : user_id,
          friend : friend_id
        }
        await newFriendCollectionRef.set(newFriendRequest);
        return({ out: true });
    },

    sendHugRequest: async function(user_id, friend_id, hug_id) {
        // Gets the time that the notification is sent
        var dateTime = new Date();
        
        const newHugCollectionRef = 
          users.doc(friend_id).collection('notifications').doc(`${hug_id}`);

        const newHug = {
          type : "hug",
          hug_id : hug_id,
          date_time : dateTime,
          user : user_id,
          friend : friend_id
        }
        await newHugCollectionRef.set(newHug);
        return({ out: true });
    },
}

// Export the module
module.exports = { NotificationsAPI, RequestsAPI }; // awaiting to be filled
