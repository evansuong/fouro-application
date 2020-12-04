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
        // UNPAGINATED VERSION (this is more preferable for frontend)
        // var notificationCollection = users
        //   .doc(uid)
        //   .collection("notifications")
        //   .orderBy("date_time")
        // const notificationSnapshot = await notificationCollection.get();
        // let notifications = [];
        // notificationSnapshot.forEach(doc => {
        //   notifications = [...notifications, doc.data()];
        // });
        // return notifications;
        // PAGINATED VERSION
        // Set current user
        const currUser = firebase.auth().currentUser;
        var first = users
            .doc(uid)
            .collection("notifications")
            .orderBy("date_time")
            .limit(5);
        return first.get().then(function (documentSnapshots) {
            // Get the last visible document
            var lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];
            console.log("last", lastVisible);

            // Construct a new query starting at this document,
            // get the next 25 cities.
            var next = users
                .doc(uid)
                .collection("notifications")
                .orderBy("date_time")
                .limit(5);
        });
    },

    deleteNotification: function (requestId) {
        requestId.delete().then();
    },
};

const RequestsAPI = {
    sendFriendRequest: async function (user_id, friend_id) {
        //Set current user
        // const currUser = firebase.auth().currentUser;
        //Gets the time that the notification is sent
        var dateTime = new Date();
        // var dateTime = db.dateTime.now();
        // navigates to current users notification collection and updates with 
        // the current time, friend_id, and type
        await users
            .doc(friend_id)
            .collection("notifications")
            .add({
                type : "friend",
                date_time : dateTime,
                sender : user_id,
                recipient: friend_id
            });
        return({ out: true });
    },

    sendHugRequest: async function(user_id, friend_id, hug_id) {
        // Set current user
        // const currUser = firebase.auth().currentUser;
        // Gets the time that the notification is sent
        var dateTime = new Date();
        // var dateTime = db.dateTime.now();
        await users
            .doc(friend_id)
            .collection("notifications")
            .add({
                type : "hug",
                hug_id : hug_id,
                date_time : dateTime,
                sender : user_id,
                recipient: friend_id
            });
        return({ out: true });
    },
}

// Export the module
module.exports = { NotificationsAPI, RequestsAPI }; // awaiting to be filled
