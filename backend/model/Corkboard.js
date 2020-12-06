// Corkboard file for Creating, Reading, Updating, and
// Deleting corkboard hugs and corkboard Management
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");

const { ViewHugAPI } = require('./Hugs');
const { UsersAPI } = require('./Users');
// Firestore
const db = firebase.firestore();
const users = db.collection("users");
const CorkboardAPI = {

    buildCorkboard: async function(uid) {
        let pinnedHugsList = [];
        let pinnedHugsref =  db.collection("users").doc(uid).collection("user_hugs"); 
        const pinnedSnapshot = await pinnedHugsref.orderBy("date_time", "desc").get();
        
        if(pinnedSnapshot.empty) {
            console.log("no matching documents");
            return {pinnedHugs : pinnedHugsList};
        }
        let hugPromises = [];
        pinnedSnapshot.forEach(  (doc) => {
            if(doc.get("pinned")){
                console.log(doc);
                hugPromises.push(doc);
            }
        });
        let pinnedHug = {};
        for(let i = 0; i < hugPromises.length; i++) {
            const hugRef = hugPromises[i].get("hug_ref").id
            const friendRef = hugPromises[i].get("friend_ref").id
            const hugResponse = await ViewHugAPI.getHugById(hugRef);
            const userResponse = await UsersAPI.getUserProfile(friendRef);
            if(hugResponse.image == null) {
                pinnedHug = {
                    hug_ref : hugPromises[i].get("hug_ref").id,
                    dateTime : hugPromises[i].get("date_time").toDate().toString(),
                    friendName :userResponse.name,
                    imageArr : userResponse.profile_pic
                };
            } else {
                pinnedHug = {
                hug_ref : hugPromises[i].get("hug_ref").id,
                dateTime : hugPromises[i].get("date_time").toDate().toString(),
                friendName :userResponse.name,
                imageArr : hugResponse.image
            };
        }
            pinnedHugsList.push(pinnedHug);
        }
            
        return { hugsList: pinnedHugsList };

    }
    
}

const PinAPI = {

    pinHugToCorkboard: function(uid, userHugId) {
        const currUser = firebase.auth().currentUser;
        db 
            .collection("users")
            .doc(uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : true
            });
            
    },

    unpinHugFromCorkboard: function(uid, userHugId) {
        const currUser = firebase.auth().currentUser;
        db 
            .collection("users")
            .doc(uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : false
            });
            
    },
}

// Export the module
module.exports = {CorkboardAPI, PinAPI};
