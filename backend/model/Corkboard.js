// Corkboard file for Creating, Reading, Updating, and
// Deleting corkboard hugs and corkboard Management
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");


// Firestore
const db = firebase.firestore();
const users = db.collection("users");
const hugs = db.collection('hugs');

const CorkboardAPI = {

    buildCorkboard: async function(uid) {
        // const currUser = firebase.auth().currentUser;

        let pinnedHugsList = [];
        // TODO: SUGGESTION. Somewhat working alternative. 
        // TODO: Datetime is not being returned at all!
        // console.log('building');
        // const hugsSnapshot = await users.doc(uid).collection("user_hugs")
        //     .orderBy("date_time", "desc").get();

        // for (const doc of hugsSnapshot.docs) {
        //   const docData = doc.data();
        //   console.log('docData: ', docData);
        //   if (docData.pinned) {
        //     const friendQuery = await users.doc(uid).get();
        //     const friendData = friendQuery.data();
        //     console.log('friendData: ', friendData);

        //     const imagesQuery = await hugs.doc(docData.hug_id).get();
        //     const imagesData = imagesQuery.data();
        //     console.log('imageData: ', imagesData);

        //     let pinnedHug = {
        //       hugId : docData.hug_id,
        //       dateTime : docData.data_time,
        //       friendName : `${friendData.first_name} ${friendData.last_name}`,
        //       friendPfp : friendData.profile_pic,
        //       imageArr : imagesData.images
        //     };
        //     pinnedHugsList.push(pinnedHug);
        //   }
        // }
        // console.log('pinnedHugsList');
        // return pinnedHugsList;


        // Previous Code
        // await users
        //     .doc(uid)
        //     .collection("user_hugs")
        //     .orderBy("date_time", "desc")
        //     .get()
        //     .then(async function (querySnapshot) {
        //         querySnapshot.forEach(async function (doc) {
        //            if(doc.get("pinned")) {
        //                 var friendQuery = 
        //                   await users.doc(doc.get('friend_id')).get();
        //                 var friendData = friendQuery.data();
        //                 var friendName = friendData.first_name;
        //                 var friendPfp = friendData.profile_pic;

        //                 var imagesQuery = 
        //                   await hugs.doc(doc.get("hug_id")).get("images");
        //                 var imagesData = imagesQuery.data();
        //                 var images = imagesData.images;
                      
        //                let pinnedHug = {
        //                    hugId : doc.get("hug_id"),
        //                    dateTime : doc.get("date_time"),
        //                    friendName : friendName,
        //                    friendPfp : friendPfp,
        //                    imageArr : images
        //                };
        //                console.log('pushing');
        //                pinnedHugsList.push(pinnedHug);
        //            }
                   
        //         });
                
        //     });
        // console.log('returning');
        // return pinnedHugsList

    }
}

const PinAPI = {

    pinHugToCorkboard: function(userHugId) {
        const currUser = firebase.auth().currentUser;
        users
            .doc(currUser.uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : true
            });
        return { out: true }
    },

    unpinHugFromCorkboard: function(userHugId) {
        const currUser = firebase.auth().currentUser;
        users
            .doc(currUser.uid)
            .collection("user_hugs")
            .doc(userHugId)
            .update({
                pinned : false
            });
        return { out: true }
    },
}

// Export the module
module.exports = {CorkboardAPI, PinAPI};
