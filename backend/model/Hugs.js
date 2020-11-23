// Hugs file for Creating, Reading, Updating, and Deleting Hugs
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");

// Firestore
const db = firebase.firestore();

const HugsAPI = {
    createHug(friend_id, message, image)
}

// Export the module
module.exports = HugsAPI;

