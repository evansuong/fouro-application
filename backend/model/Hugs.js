// Hugs file for Creating, Reading, Updating, and Deleting Hugs
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

//import users
var Users = require("../model/Users");

// Firestore
const db = firebase.firestore();
const users = db.collection("users");

const HugsAPI = {
    // The user that calls this function is the sender
    // TODO: More error handling and monitor upload progress?
    createHug: function (friendId, message, image) {
        // Set current user
        const currUser = firebase.auth().currentUser;
        // Set the date of the hug (also used to ID image)
        var dateTime = db.dateTime.now();
        var dateTimeString = dateTime.toString();
        // Image: byte array
        // Create a root reference in firebase storage
        var storageRef = firebase.storage().ref();
        // Create a unique image ID
        var imageName = "images/" + dateTimeString;
        // Create a reference to the hug image (use when we download?)
        // var hugImageRef = storageRef.child(imageName)
        // Convert the byte array image to Uint8Array
        var bytes = new Uint8Array(image);
        // TODO: not sure if var is needed
        var uploadTask = storageRef.child(imageName).put(bytes);
        // Add fields to the top level "hugs" collection and store the reference
        // Save a reference to the top level hug with an autoID (I think)
        var topLevelHug = db.collection("user_hugs").doc();
        topLevelHug.set({
            completed: false,
            date_time: dateTime,
            receiver_description: "",
            sender_description_: message,
            images: [uploadTask],
            receiver_id: friendId,
            sender_id: currUser.uid,
        });
        // Add fields to currUser's hug auto-ID document
        users
            .doc(currUser.uid)
            .collection("user_hugs")
            .add({
                date_time: dateTime, //dateTime is an actual DateTime object (timestamp?)
                friend: friendId,
                hug_id: topLevelHug, //Use the ref to the top level hug ^^
                pinned: false,
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        friendId
            .collection("user_hugs")
            .add({
                date_time: dateTime, //dateTime is an actual DateTime object (timestamp?)
                friend: friendId,
                hug_id: topLevelHug, //Use the ref to the top level hug ^^
                pinned: false,
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    },
};

const UpdateHugAPI = {
    // The current user must be the receiver of a hug
    respondToHug: function (hugId, message, image) {
        // Process the image
        // Create a root reference
        var storageRef = firebase.storage().ref();
        // Create a unique image ID
        var imageName = "images/" + dateTimeString;
        // Create a reference to the hug image (use when we download?)
        // var hugImageRef = storageRef.child(imageName)
        // Convert the byte array image to Uint8Array
        var bytes = new Uint8Array(image);
        // uploadTask is the ref to the image in GCP?
        var uploadTask = storageRef.child(imageName).put(bytes);

        // hugId is a refernce to the top level hug
        hugId.update({
            completed: true,
            description_receiver: message,
            images: db.FieldValue.arrayUnion(uploadTask), //not sure how arrayUnion works
        });

        // Call updateHugUsers()
        this.updateHugUsers(hugId);
        // TODO: call deleteHugRequest
        //deleteHugRequest(TODO)
    },

    updateHugUsers: function (hugId) {
        // Increment hug count for sender
        hugId
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    // Increment receiver and sender hug count
                    Users.UsersAPI.increaseHugCount(doc.data().receiver_id);
                    Users.UsersAPI.increaseHugCount(doc.data().sender_id);
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    },

    // hugId is the global hug.
    // NOT SURE if hugId.delete is okay bc idk what hugId really is...
    dropAHug: function (requestId, hugId) {
        // TODO: delete requestId?
        // TODO: delete the document corresponding to this hug in the sender's user_hugs
        // TODO: Remove hug images from storage
        // TODO: Loop through each element in the images array of hugId
        // Create a root reference in firebase storage
        var storageRef = firebase.storage().ref();
        // TODO: .delete().then(???)
        storageRef.child(imageName).delete().then();

        // Delete the global hug document
        hugId.delete().then();
    },
};

const ViewHugAPI = {
    getHugById: function (hugId) {
        db.collection("hugs")
            .doc(hugId)
            .get()
            .then(function (variable) {
                if (variable.exists) {
                    return variable.data();
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    },

    // Gets all hugs from the currently logged in user
    // TODO: not sure how to use the paginated data "next"
    // TODO: delete one of the versions. not sure how to return multiple docs?
    getUserHugs: function () {
        // GET ALL VERSION
        db.doc(currUser.uid)
            .collection("user_hugs")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, "=>", doc.data());
                    //this should be like?
                    return doc.data();
                });
            });

        // PAGINATED VERSION
        var first = db
            .doc(currUser.uid)
            .collection("user_hugs")
            .orderBy("date_time")
            .limit(25);
        return first.get().then(function (documentSnapshots) {
            // Get the last visible document
            var lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];
            console.log("last", lastVisible);

            // Construct a new query starting at this document,
            // get the next 25 cities.
            var next = db
                .doc(currUser.uid)
                .collection("user_hugs")
                .orderBy("date_time")
                .limit(25);
        });
    },
};

// Export the module
module.exports = { HugsAPI, UpdateHugAPI, ViewHugAPI };
