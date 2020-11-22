// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");

// Firestore
const NotificationsAPI = {

    getNotifications: function() {

    },

    deleteNotification: function(requestId) {

    },
}

const RequestsAPI = {
    sendFriendRequest: function(userId) {

    },

    createHugRequest(friendId, hugId) {

    }
}

// Export the module
module.exports = {NotificationsAPI, RequestsAPI}; // awaiting to be filled
