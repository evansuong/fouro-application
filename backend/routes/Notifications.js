// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
import Fire from "../firebase/config";

// Firestore
export const db = Fire.firestore();

const NotificationsAPI = {

    getNotifications: function() {

    },

    deleteNotification: function(request_id) {

    },
}

const RequestsAPI = {
    sendFriendRequest: function(user_id) {

    },

    createHugRequest(friend_id, hug_id) {

    }
}