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

function convertDate(date) {
  const dateStr = date.toString();
  const dateArr = dateStr.split(' ');
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ampm;
  return `${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[3]} ${strTime}`
}

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
      .where("completed", "==", true) // Added secondary check
      .where("pinned", "==", true)
      .get();

    if (pinnedSnapshot.empty) {
      // console.log("Corkboard 30 no matching documents");
      return { hugsList: pinnedHugsList };
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
      const oldDateTime = hugPromises[i].get("date_time").toDate();
      const newDateTime = convertDate(oldDateTime);
      //if there are no images add the profile picture
      if (hugResponse.images.length == 0) {
        pinnedHug = {
          hug_ref: hugId,
          dateTime: newDateTime,
          friendName: userResponse.name,
          image: userResponse.profile_pic,
        };
      } else {
        pinnedHug = {
          hug_ref: hugId,
          dateTime: newDateTime,
          friendName: userResponse.name,
          image: hugResponse.images[0],
        };
      }
      pinnedHugsList.push(pinnedHug);
      // console.log('Pinnedhug 62', pinnedHug);
    }
    // console.log('Corkboard 61', JSON.stringify(pinnedHugsList));
    return { hugsList: pinnedHugsList };
  },
};

const PinAPI = {
  /* Changes the pinned field to be true
   * @param userid and user hug id
   * @return none
   */
  pinHugToCorkboard: async function (uid, userHugId) {
    try {
      await users.doc(uid).collection('user_hugs').doc(userHugId).update({
        pinned: true,
      })
      return { out: true }
    } catch(err) {
      console.log('Corkboard 82', err);
      return { out: false }
    }
  },
  /* Changes the pinned field to be false
   * @param user id and user hug id
   * @return none
   */
  unpinHugFromCorkboard: async function (uid, userHugId) {
    try {
      console.log(uid, userHugId);
      await users.doc(uid).collection('user_hugs').doc(userHugId).update({
        pinned: false,
      })
      return { out: true }
    } catch(err) {
      console.log('Corkboard.js 82', err);
      return { out: false }
    }
  },
};

// Export the module
module.exports = { CorkboardAPI, PinAPI };
