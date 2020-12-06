// Hugs file for Creating, Reading, Updating, and Deleting Hugs
var firebase = require("../firebase/admin");
var firebase2 = require("../firebase/config");
const admin = require("firebase-admin");
require("firebase/firestore");
require("firebase/storage");
global.XMLHttpRequest = require("xhr2");

// import
const Users = require("./Users");
const Notifications = require("./Notifications");

// Firestore
const db = firebase.firestore();
const users = db.collection("users");
const hugs = db.collection("hugs");

// Storage
const storage = firebase2.storage();
const storageRef = firebase2.storage().ref();

const HugsAPI = {
  // HELPER FUNCTIONS
  uploadBase64ArrayToHugs: async function (base64Array, imageName) {
    var downloadURLArrays = [];
    for (let i = 0; i < base64Array.length; i++) {
      let baseString = base64Array[i];
      // Get only the data of the base64
      baseString = baseString.substr(baseString.indexOf(",") + 1);

      // Path to image is: hug_images/[topLevelHug.id]/Timestamp in milliseconds[i]
      // Where "i" is the ith string in the base64Array
      const hugImageRef = storageRef.child(imageName + i) + ".jpg";

      //convert base64 to buffer / blob
      const blob = Buffer.from(baseString, "base64");

      // MIME Metadata
      let metadata = {
        contentType: "image/jpeg",
      };

      // Upload to firestore
      hugImageRef.put(blob, metadata).then((snapshot) => {
        console.log("Success!");
      });

      // Add the downloadURL to our return array
      let downloadURL = hugImageRef.getDownloadURL();
      downloadURLArrays.push(downloadURL);
    }
    return downloadURLArrays;
  },

  // The user that calls this function is the sender
  // TODO: More error handling and monitor upload progress?
  createHug: async function (currentUser, friendId, message, base64) {
    // Set current user
    var currUser = users.doc(currentUser);
    // Save a reference to the top level hug with an autoID (I think)
    var topLevelHug = db.collection("hugs").doc(); //possible problems if we make a doc every time

    // Set the date of the hug (also used to ID image)
    let dateInMillis = Date.now();
    let dateInSeconds = Math.floor(dateInMillis / 1000);
    var dateTime = new admin.firestore.Timestamp(dateInSeconds, 0);
    // Create a unique image ID
    var imageName = "hug_images/" + topLevelHug.id + "/" + dateInMillis;
    var imageDownloadURLSArray = await this.uploadBase64ArrayToHugs(
      base64,
      imageName
    );
    // Set the topLevelHug's data
    topLevelHug.set({
      completed: false,
      date_time: dateTime,
      receiver_description: "",
      sender_description: message,
      images: imageDownloadURLSArray,
      receiver_ref: users.doc(friendId),
      sender_ref: currUser,
    });

    // MAKE SURE THIS HAPPENS AFTER WE MADE THE TOP LEVEL HUG
    await users
      .doc(currUser.id)
      .collection("user_hugs")
      .doc(topLevelHug)
      .set({
        completed: false,
        date_time: dateTime, //dateTime is an actual DateTime object (timestamp?)
        friend_ref: users.doc(friendId),
        hug_ref: topLevelHug, //Use the ref to the top level hug ^^
        pinned: false,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    await friendId
      .collection("user_hugs")
      .doc(topLevelHug)
      .set({
        completed: false,
        date_time: dateTime, //dateTime is an actual DateTime object (timestamp?)
        friend_ref: users.doc(friendId),
        hug_ref: topLevelHug, //Use the ref to the top level hug ^^
        pinned: false,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    // Create a hug request
    Notifications.RequestsAPI.sendHugRequest(currentUser, friendId);
    return { out: true };
  },

  // hugId is the global hug.
  dropHug: function (currentUser, requestId, hugId) {
    // Set current user
    var currUser = users.doc(currentUser);
    // Set ref for top level hug
    var topLevelHug = db.collection("hugs").doc(hugId);
    // delete requestId
    users
      .doc(currUser.id)
      .collection("notifications")
      .doc(requestId)
      .delete()
      .then();
    // delete the sender's user_hug
    users
      .doc(db.collection("hugs").doc(hugId).get("sender_ref").id)
      .delete()
      .then();
    // delete the receiver's user_hug
    users
      .doc(db.collection("hugs").doc(hugId).get("receiver_ref").id)
      .delete()
      .then();
    // Remove hug images from storage

    // TODO: Loop through each element in the images array of hugId
    db.collection("hugs")
      .doc(hugId)
      .get("images")
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (image) {
          // Every time we get another HTTPS URL from images, we need to make an httpsReference
          // Create a reference from a HTTPS URL
          var httpsReference = storage.getReferenceFromURL(image);
          httpsReference.delete().then();
        });
        return results;
      });
    // Delete the global hug document
    topLevelHug.delete().then();
  },

  deleteAllImagesInArray: function (imagesArray) {
    var storage = firebase.storage();
    // Loop through each element in the images array of hugId
    imagesArray.forEach(function (image) {
      // Every time we get another HTTPS URL from images, we need to make an httpsReference
      // Create a reference from a HTTPS URL
      var httpsReference = storage.refFromURL(image);
      httpsReference
        .delete()
        .then(function () {
          // File deleted successfully
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
        });
    });
  },

  deleteImage: async function (imageHttps) {
    // Create a root reference in firebase storage
    var httpsReference = storage.refFromURL(imageHttps);
    httpsReference
      .delete()
      .then(function () {
        // File deleted successfully
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  },

  deleteImageFromPath: function (pathString) {
    storageRef
      .child(pathString)
      .delete()
      .then(function () {
        // File deleted successfully
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  },
};

const UpdateHugAPI = {
  // currentUser must be the receiver of a hug
  respondToHug: async function (currentUser, hugId, message, base64) {
    // Set current user
    var currUser = users.doc(currentUser);
    // Process the image
    // Set the date of the hug (also used to ID image)
    let dateInMillis = Date.now();
    let dateInSeconds = Math.floor(dateInMillis / 1000);
    var dateTime = new admin.firestore.Timestamp(dateInSeconds, 0);
    // Create a unique image ID
    var imageName = "hug_images/" + topLevelHug.id + "/" + dateInMillis;
    // Set a var to an array of the downloadURLs
    var imageDownloadURLSArray = await this.uploadBase64ArrayToHugs(
      base64,
      imageName
    );
    // Update the top level hug to include more pictures and the receiver's message
    hugs.doc(hugId).update({
      completed: true,
      description_receiver: message,
      images: db.FieldValue.arrayUnion(imageDownloadURLSArray),
    });
    // Call updateUserHugCount()
    this.updateUserHugCount(hugId);
    // Call deleteNotification
    // Getting the requestId may be questionable
    currUserNotifRef = db
      .colection("users")
      .doc(currUser.id)
      .collection("notifications");
    requestIdRef = currUserNotifRef.where("hug_id", "==", hugId);
    Notifications.NotificationsAPI.deleteNotification(requestIdRef);
  },

  updateUserHugCount: function (hugId) {
    db.collection("hugs")
      .doc(hugId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // Increment receiver and sender hug count
          let receiverId = doc.data().receiver_ref.id;
          let senderId = doc.data().sender_ref.id;
          Users.UsersAPI.increaseHugCount(receiverId);
          Users.UsersAPI.increaseHugCount(senderId);
          // Update each user's user_hug to completed : true
          users.doc(receiverId).update({
            completed: true,
          });
          users.doc(senderId).update({
            completed: true,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  },
};

const ViewHugAPI = {
  // TODO: MAKE SURE OUTPUTS STRING JSON
  getHugById: async function (hugId) {
    var fullHugInfo = {};
    // Set the hugData
    const hugQuery = await hugs.doc(hugId).get();
    const hugData = hugQuery.data();
    // Set the receiver profile
    var receiverProfile = await Users.UsersAPI.getUserProfile(
      hugData.receiver_ref.id
    );
    // Set the sender user profile
    var senderProfile = await Users.UsersAPI.getUserProfile(
      hugData.sender_ref.id
    );
    // console.log(hugData);
    if (Object.keys(hugData).length != 0) {
      fullHugInfo.date_time = hugData.date_time.toDate().toString();
      fullHugInfo.images = hugData.images;
      // RECEIVER
      fullHugInfo.receiver_description = hugData.receiver_description;
      fullHugInfo.receiver_name = receiverProfile.name;
      fullHugInfo.receiver_username = receiverProfile.username;
      fullHugInfo.receiver_profile_picture = receiverProfile.profile_pic;
      fullHugInfo.receiver_id = hugData.receiver_ref.id;
      // SENDER
      fullHugInfo.sender_description = hugData.sender_description;
      fullHugInfo.sender_name = senderProfile.name;
      fullHugInfo.sender_username = senderProfile.username;
      fullHugInfo.sender_profile_picture = senderProfile.profile_pic;
      fullHugInfo.sender_id = hugData.sender_ref.id;
    } else {
      console.log("No such document!");
    }
    // console.log(fullHugInfo.sender_description);
    return fullHugInfo;
  },

  // Gets all hugs from the currently logged in user
  // TODO: not sure how to use the paginated data "next"
  // TODO: delete one of the versions. not sure how to return multiple docs?
  getUserHugs: async function (currentUser) {
    // GET ALL VERSION

    var results = [];
    const userHugsQuery = await users
      .doc(currentUser)
      .collection("user_hugs")
      .orderBy("date_time", "desc")
      .where("completed", "==", true)
      .get();
    // Go through each user_hug that is completed
    for (const doc of userHugsQuery.docs) {
      let currHugId = doc.data().hug_ref.id;
      let currHug = await hugs.doc(currHugId).get();
      let currHugData = currHug.data();
      var loadIn = {};
      // Set the name of the person currentUser hugged
      if (users.doc(currentUser).id == currHugData.receiver_ref.id) {
        let friend = await Users.UsersAPI.getUserProfile(
          currHugData.sender_ref.id
        );
        loadIn.friend_name = friend.name;
        loadIn.friend_username = friend.username;
        loadIn.friend_profile_pic = friend.profile_pic;
      } else if (users.doc(currentUser).id == currHugData.sender_ref.id) {
        let friend = await Users.UsersAPI.getUserProfile(
          currHugData.receiver_ref.id
        );
        loadIn.friend_name = friend.name;
        loadIn.friend_username = friend.username;
        loadIn.friend_profile_pic = friend.profile_pic;
      }
      // Set the message to be the SENDER'S message ALWAYS
      loadIn.message = currHugData.sender_description;
      // Set the image to be the first image added
      loadIn.image = currHugData.images[0];
      // Set the hugId
      loadIn.hug_id = currHugId;
      // add the JSON the results array
      results = [...results, loadIn];
    }
    var feed = { userHugs: results };
    return feed;

    // PAGINATED VERSION
    // var first = db
    //     .collection("users")
    //     .doc(currUser.uid)
    //     .collection("user_hugs")
    //     .orderBy("date_time")
    //     .limit(25);
    // return first.get().then(function (documentSnapshots) {
    //     // Get the last visible document
    //     var lastVisible =
    //         documentSnapshots.docs[documentSnapshots.docs.length - 1];
    //     console.log("last", lastVisible);

    //     // Construct a new query starting at this document,
    //     // get the next 25 hugs.
    //     var next = db
    //         .collection("users")
    //         .doc(currUser.uid)
    //         .collection("user_hugs")
    //         .orderBy("date_time")
    //         .limit(25);
    // });
  },

  getSharedHugs: async function (currentUser, targetUser) {
    // GET ALL VERSION

    // Set the hugData
    // const currUser = Users.UsersAPI.getUserProfile(currentUser);
    // const currUserName = currUser.name;
    // const currUserUsername = currUser.username;
    // const currUserProfilePic = currUser.profile_pic;

    var results = [];
    const hugsQuery = await hugs
      .orderBy("date_time", "desc")
      .where("completed", "==", true)
      .get();
    // Go through each user_hug that is completed
    for (const doc of hugsQuery.docs) {
      let currHugData = doc.data();
      var loadIn = {};
      senderId = currHugData.sender_ref.id;
      receiverId = currHugData.receiver_ref.id;
      // adds any hug with both users to the results array
      if (
        (senderId === currentUser && receiverId === targetUser) ||
        (senderId === targetUser && receiverId === currentUser)
      ) {
        // Set the name of the person currentUser hugged
        if (users.doc(currentUser).id == currHugData.receiver_ref.id) {
          let friend = await Users.UsersAPI.getUserProfile(
            currHugData.sender_ref.id
          );
          loadIn.friend_name = friend.name;
          loadIn.friend_username = friend.username;
          loadIn.friend_profile_pic = friend.profile_pic;
        } else if (users.doc(currentUser).id == currHugData.sender_ref.id) {
          let friend = await Users.UsersAPI.getUserProfile(
            currHugData.receiver_ref.id
          );
          loadIn.friend_name = friend.name;
          loadIn.friend_username = friend.username;
          loadIn.friend_profile_pic = friend.profile_pic;
        }
        // Set the message to be the SENDER'S message ALWAYS
        loadIn.message = currHugData.sender_description;
        // Set the image to be the first image added
        loadIn.image = currHugData.images[0];
        // Set the hugId
        loadIn.hug_id = doc.id;
        // add the JSON the results array
        results = [...results, loadIn];
      }
    }
    var feed = { sharedHugs: results };
    return feed;
  },
};

// Export the module
module.exports = { HugsAPI, UpdateHugAPI, ViewHugAPI };
