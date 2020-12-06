// Corkboard file for Creating, Reading, Updating, and
// Deleting corkboard hugs and corkboard Management
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");

const Hugs = require("./Hugs");
const { UsersAPI } = require("./Users");

// Firestore
const db = firebase.firestore();
const users = db.collection("users");

const CorkboardAPI = {
  /* Get all pinned Hugs
   * @param : user id
   * @return {JSON} of all pinned hugs lists
   */
  buildCorkboard: async function (uid) {
    let hugPromises = []; // hug promises
    let pinnedHugsList = []; // all pinned hugs as JSON objects
    let pinnedHugsref = users.doc(uid).collection("user_hugs");
    const pinnedSnapshot = await pinnedHugsref
      .orderBy("date_time", "desc")
      .where("pinned", "==", true)
      .get();

    if (pinnedSnapshot.empty) {
      console.log("no matching documents");
      return { pinnedHugs: pinnedHugsList };
    }
    // adds all pinned hugs to a list
    pinnedSnapshot.forEach((doc) => {
      hugPromises.push(doc);
    });
    let pinnedHug = {}; // JSON object

    for (let i = 0; i < hugPromises.length; i++) {
      const hugId = hugPromises[i].get("hug_ref").id;
      const friendId = hugPromises[i].get("friend_ref").id;
      const hugResponse = await Hugs.ViewHugAPI.getHugById(hugId);
      const userResponse = await UsersAPI.getUserProfile(friendId);
      //if there are no images add the profile picture
      if (hugResponse.images.length == 0) {
        pinnedHug = {
          hug_ref: hugId,
          dateTime: hugPromises[i].get("date_time").toDate().toString(),
          friendName: userResponse.name,
          image: userResponse.profile_pic,
        };
      } else {
        pinnedHug = {
          hug_ref: hugId,
          dateTime: hugPromises[i].get("date_time").toDate().toString(),
          friendName: userResponse.name,
          image: hugResponse.images[0],
        };
      }
      pinnedHugsList.push(pinnedHug);
    }

    return { hugsList: pinnedHugsList };
  },
};

const PinAPI = {
  /* Changes the pinned field to be true
   * @param userid and user hug id
   * @return none
   */
  pinHugToCorkboard: function (uid, userHugId) {
    db.collection("users")
      .doc(uid)
      .collection("user_hugs")
      .doc(userHugId)
      .update({
        pinned: true,
      });
  },
  /* Changes the pinned field to be false
   * @param user id and user hug id
   * @return none
   */
  unpinHugFromCorkboard: function (uid, userHugId) {
    db.collection("users")
      .doc(uid)
      .collection("user_hugs")
      .doc(userHugId)
      .update({
        pinned: false,
      });
  },
};

// Export the module
module.exports = { CorkboardAPI, PinAPI };
