// Corkboard file for Creating, Reading, Updating, and
// Deleting corkboard hugs and corkboard Management
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");


// Firestore
const db = firebase.firestore();
const users = db.collection("users");
const CorkboardAPI = {

    buildCorkboard: function() {
        const currUser = firebase.auth().currentUser;
        let pinnedHugsList = [];
        db
            .collection("users")
            .doc(currUser.uid)
            .collection("user_hugs")
            .orderBy("date_time", "desc")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                   if(doc.get("pinned")) {
                        var name = db
                                        .collection("users")
                                        .doc(doc.get("friend_id"))
                                        .get("first_name");
                        var pfp = db
                                        .collection("users")
                                        .doc(doc.get("friend_id"))
                                        .get("profile_pic");
                        var images = db
                                        .collection("hugs")
                                        .doc(doc.get("hug_id"))
                                        .get("images");
                      
                       let pinnedHug = {
                           hugId : doc.get("hug_id"),
                           dateTime : doc.get("date_time"),
                           friendName : friendName,
                           friendPfp : friendPfp,
                           imageArr : images
                       };
                       pinnedHugsList.push(pinnedHug);
                   }
                   
                });
                
            });
        return pinnedHugsList

    }
}

const PinAPI = {

    pinHugToCorkboard: function(userHugId) {
        const currUser = firebase.auth().currentUser;
        db 
            .collection("users")
            .doc(currUser.uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : true
            });
            
    },

    unpinHugFromCorkboard: function(userHugId) {
        const currUser = firebase.auth().currentUser;
        db 
            .collection("users")
            .doc(currUser.uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : false
            });
            
    },
}

// Export the module
module.exports = {CorkboardAPI, PinAPI};
