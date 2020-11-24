// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");


// Firestore
const db = firebase.firestore();
const users = db.collection("users");
// Firestore
const NotificationsAPI = {
    getNotifications: function () {
        // PAGINATED VERSION
        var first = db
            .doc(currUser.uid)
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
            var next = db
                .doc(currUser.uid)
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
    sendFriendRequest: function (userId) {
        //Set current user
        const currUser = firebase.auth().currentUser;
        //Gets the time that the notification is sent
        var dateTime = db.dateTime.now();
        //navigates to current users notification collection and updates with 
        // the current time, friend_id, and type
        db
            .collection("users")
            .doc(userId)
            .collection("notifications")
            .add({
                type : "friend",
                date_time : dateTime,
                friend_id : currUser.uid
                
            });
    },

    sendHugRequest(friendId, hugId) {
         //Set current user
         const currUser = firebase.auth().currentUser;
         //Gets the time that the notification is sent
         var dateTime = db.dateTime.now();
         db
            .collection("users")
            .doc(friendId)
            .collection("notifications")
            .add({
                type : "hug",
                hug_id : hugId,
                date_time : dateTime,
                user_id : currUser.uid
            });
    },
}

// Export the module
module.exports = { NotificationsAPI, RequestsAPI }; // awaiting to be filled
