// Hugs file for Creating, Reading, Updating, and Deleting Hugs
var firebase = require("../firebase/admin");
var firebase2 = require("../firebase/config");
const admin = require("firebase-admin");
require("firebase/firestore");
require("firebase/storage");
global.XMLHttpRequest = require("xhr2");

// Import
const Users = require("./Users");
const Notifications = require("./Notifications");
const Friends = require("./Friends");

// Firestore
const db = firebase.firestore();
const users = db.collection("users");
const hugs = db.collection("hugs");

// Storage
const storageRef = firebase2.storage().ref();
const storage = firebase2.storage();

function convertDate(date) {
  const dateStr = date.toString();
  const dateArr = dateStr.split(" ");
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + ampm;
  return `${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[3]} ${strTime}`;
}

const HugsAPI = {
  // HELPER FUNCTIONS
  uploadBase64ArrayToHugs: async function (base64Array, imageName) {
    let downloadURLArrays = [];
    // Edge check
    if (base64Array.length == 0) {
      return downloadURLArrays;
    }

    // Traverse through base64 strings
    // console.log(base64Array.length);
    for (let i = 0; i < base64Array.length; i++) {
      let baseString = base64Array[i];
      // Get only the data of the base64
      baseString = baseString.substr(baseString.indexOf(",") + 1);

      // Path to image is: hug_images/[topLevelHug.id]/Timestamp in milliseconds[i]
      // Where "i" is the ith string in the base64Array
      let path = `${imageName}-${i}.jpg`;
      // console.log(path);
      const hugImageRef = storageRef.child(path);

      //convert base64 to buffer / blob
      const blob = Buffer.from(baseString, "base64");

      // MIME Metadata
      let metadata = {
        contentType: "image/jpeg",
      };

      // Upload to firestore
      await hugImageRef.put(blob, metadata).then((snapshot) => {
        console.log("Success!");
      });

      // Add to array
      downloadURLArrays.push(await hugImageRef.getDownloadURL());
    }

    console.log(downloadURLArrays);

    return downloadURLArrays;
  },

  // The user that calls this function is the sender
  // TODO: More error handling and monitor upload progress?
  createHug: async function (currentUser, friendId, message, base64) {
    // Set current user
    var currUser = users.doc(currentUser);
    // Save a reference to the top level hug with an autoID (I think)
    var topLevelHug = hugs.doc(); //possible problems if we make a doc every time

    // Set the date of the hug (also used to ID image)
    let dateInMillis = Date.now();
    let dateInSeconds = Math.floor(dateInMillis / 1000);
    var dateTime = new admin.firestore.Timestamp(dateInSeconds, 0);
    // Create a unique image ID
    var imageName = `hug_images/${topLevelHug.id}/${dateInMillis}`;

    var imageDownloadURLSArray = await this.uploadBase64ArrayToHugs(
      base64,
      imageName
    );

    // Set the topLevelHug's data
    await topLevelHug.set({
      completed: false,
      date_time: dateTime,
      receiver_description: "",
      sender_description: message,
      images: imageDownloadURLSArray,
      receiver_ref: users.doc(friendId),
      sender_ref: currUser,
    });

    // MAKE SURE THIS HAPPENS AFTER WE MAKE THE TOP LEVEL HUG
    // Add hug to user
    await currUser
      .collection("user_hugs")
      .doc(topLevelHug.id)
      .set({
        completed: false,
        date_time: dateTime,
        friend_ref: users.doc(friendId),
        hug_ref: topLevelHug, // Use the ref to the top level hug ^^
        pinned: false,
      })
      .then(function (docRef) {
        console.log(
          "Document written with ID: " +
            currUser.collection("user_hugs").doc(topLevelHug.id).id
        );
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    // add hug to friend
    await users
      .doc(friendId)
      .collection("user_hugs")
      .doc(topLevelHug.id)
      .set({
        completed: false,
        date_time: dateTime, //dateTime is an actual DateTime object (timestamp?)
        friend_ref: users.doc(friendId),
        hug_ref: topLevelHug, //Use the ref to the top level hug ^^
        pinned: false,
      })
      .then(() => {
        console.log(
          "Document written with ID: " +
            users.doc(friendId).collection("user_hugs").doc(topLevelHug.id).id
        );
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    // Create a hug request
    await Notifications.RequestsAPI.sendHugRequest(
      currentUser,
      friendId,
      topLevelHug.id
    );

    return { out: topLevelHug.id };
  },

  // hugId is the global hug.
  dropHug: async function (currentUser, requestId, hugId) {
    // Set current user
    var currUser = users.doc(currentUser);
    // Set ref for top level hug
    var topLevelHug = hugs.doc(hugId);
    const topLevelHugQuery = await topLevelHug.get();
    const topLevelHugData = topLevelHugQuery.data();
    const friendId = topLevelHugData.sender_ref.id;
    // delete requestId
    await users
      .doc(currUser.id)
      .collection("notifications")
      .doc(requestId)
      .delete();
    // // delete the receiever's hug
    const hugRef = await hugs.doc(hugId).get("sender_ref");
    await users.doc(currUser.id).collection("user_hugs").doc(hugId).delete();
    // delete the sender's hug
    await users.doc(friendId).collection("user_hugs").doc(hugId).delete();
    await users.doc(hugRef.id).delete();
    // Remove hug images from storage

    // TODO: Loop through each element in the images array of hugId
    const hugSnapshot = await hugs.doc(hugId).get("images");
    const { images } = hugSnapshot.data();
    for (let i = 0; i < images.length; i++) {
      // Every time we get another HTTPS URL from images, we need to make an httpsReference
      // Create a reference from a HTTPS URL
      const httpsReference = await storage.refFromURL(images[i]);
      await httpsReference.delete();
    }
    // Delete the global hug document
    await topLevelHug.delete();

    return { out: true };
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
  /**
   * Helper Function for Respond to Hug
   * @param {string} hugId
   */
  updateUserHugCount: function (hugId) {
    db.collection("hugs")
      .doc(hugId)
      .get()
      .then(async function (doc) {
        if (doc.exists) {
          // Increment receiver and sender hug count
          let receiverId = doc.data().receiver_ref.id;
          let senderId = doc.data().sender_ref.id;
          console.log(receiverId, senderId);
          Users.HugCountAPI.increaseHugCount(receiverId);
          Users.HugCountAPI.increaseHugCount(senderId);
          // Update each user's user_hug to completed : true
          users.doc(receiverId).update({
            completed: true,
          });
          users.doc(senderId).update({
            completed: true,
          });
        } else {
          console.log("Hugs 300 No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  },

  /**
   * Allow the user to respond to hug
   * @param {string} currentUser
   * @param {string} hugId
   * @param {string} message
   * @param {[string]} base64
   */
  respondToHug: async function (currentUser, hugId, message, base64) {
    try {
      let currUserRef = users.doc(currentUser);
      // Set the date of the hug (also used to ID image)
      let dateInMillis = Date.now();
      let dateInSeconds = Math.floor(dateInMillis / 1000);
      let dateTime = new admin.firestore.Timestamp(dateInSeconds, 0);
      // Create a unique image ID
      let imageRef = `hug_images/${hugId}/${dateInMillis}`;
      // Set a var to an array of the downloadURLs
      let imageDownloadURLSArray = await HugsAPI.uploadBase64ArrayToHugs(
        base64,
        imageRef
      );

      const hugQuery = await hugs.doc(hugId).get();
      const hugData = hugQuery.data();

      // Update the top level hug to include more pictures and the receiver's message
      await hugs.doc(hugId).update({
        completed: true,
        receiver_description: message,
        images: [...hugData.images, ...imageDownloadURLSArray],
      });

      await currUserRef
        .collection("user_hugs")
        .doc(hugId)
        .update({
          completed: true,
          date_time: hugData.date_time,
        })
        .then(function (docRef) {
          console.log(
            "Document updated with ID: " +
              currUserRef.collection("user_hugs").doc(hugId).id
          );
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      await users
        .doc(hugData.sender_ref.id)
        .collection("user_hugs")
        .doc(hugId)
        .update({
          completed: true,
          date_time: hugData.date_time,
        })
        .then(function (docRef) {
          console.log(
            "Document updated with ID: " +
              users
                .doc(hugData.sender_ref.id)
                .collection("user_hugs")
                .doc(hugId).id
          );
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Update User Hug Counts
      this.updateUserHugCount(hugId);
      // Update both users' hug dates
      console.log("hi");
      Friends.FriendsAPI.updateFriendHugDate(
        currentUser,
        hugData.sender_ref.id,
        hugData.date_time
      );

      return { out: true };
    } catch (err) {
      console.log("Hugs 315 Error occurred responding to hug", err);
    }
  },
};

const ViewHugAPI = {
  // TODO: MAKE SURE OUTPUTS STRING JSON
  getHugById: async function (hugId) {
    var fullHugInfo = {};
    // Set the hugData
    const hugQuery = await hugs.doc(hugId).get();
    const hugData = hugQuery.data();

    if (hugData == undefined) {
      return { out: "Hug does not exist" };
    }
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
      const oldDateTime = hugData.date_time.toDate();
      const newDateTime = convertDate(oldDateTime);
      fullHugInfo.date_time = newDateTime;
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
      console.log("Hugs 347 No such document!");
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
      // Set if the hug is pinned or not
      loadIn.pinned = doc.data().pinned;
      // add the JSON the results array
      results = [...results, loadIn];
    }
    var feed = { userHugs: results };
    return feed;
  },

  getSharedHugs: async function (currentUser, targetUser) {
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

    console.log(results);
    return { sharedHugs: results };
  },
};

// Export the module
module.exports = { HugsAPI, UpdateHugAPI, ViewHugAPI };
