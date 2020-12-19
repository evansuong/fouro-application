// Cloud Functions that will reset User values at the end of the day
// This will be manually called to "simulate" the dawn of a new day (12AM)
var firebase = require("../firebase/admin");
require("firebase/firestore");

const { HugCountAPI } = require("./Users");

const db = firebase.firestore();
const usersCollection = db.collection("users");

// constants for calculating the time
var resetYet = false;
const secondsInDay = 86400;
const pstOffset = 28800;

// constant for loop speed
const minuteInMS = 60 * 1000;

/*
 * For connecting the cloud functions to the backend server
 */
module.exports = CloudFunctionsAPI = {
  /**
   * Helper function for resetting each user's hug count and streak
   */
  resetUserHugCounts: async function () {
    let userDocs = await usersCollection.get();
    let usersArr = await userDocs.docs;

    // For updating each user's counts
    for (i = 0; i < usersArr.length; i++) {
      let snapshot = usersArr[i];

      hug_count = await snapshot.get("day_hug_count");
      streak_count = await snapshot.get("current_streak");
      userDocRef = snapshot.ref;

      const hugvars = {
        current_streak: streak_count,
        day_hug_count: 0,
      };

      // reset the streaks of users who did not reach 4 hugs that day.
      if (hug_count < 4) {
        hugvars.current_streak = 0;
      }

      // reset the hug counts of all users.
      await userDocRef.update(hugvars);
    }
  },
};

/*
 * Function that checks whether it is time for hug_count reset.
 * Called once every minute.
 */
async function dailyReset() {
  // calculate current time
  let dateInMillis = Date.now();
  let dateInSeconds = Math.floor(dateInMillis / 1000) - pstOffset;

  // booleans to determine whether the current time is 0 -> 12 or 12 -> 24
  let beforeMidnight = dateInSeconds % secondsInDay >= secondsInDay / 2;
  let afterMidnight = dateInSeconds % secondsInDay >= 0 && !beforeMidnight;

  /*
   * case where hug counts have not yet been reset and it's past midnight => time to reset!
   *  - set resetYet to true to prevent further resets from 0 -> 12
   *  - iterate through each user and reset their hug counts, and streaks if applicable
   */
  if (resetYet == false && afterMidnight) {
    console.log("Resetting user hug counts...");

    // Calling resetUserHugCount
    await CloudFunctionsAPI.resetUserHugCounts();

    resetYet = true;
  }

  /*
   * case where hug counts have not yet been reset and it's past noon => get ready for reset!
   *  - set resetYet to false to prepare the script for the midnight reset
   */
  if (resetYet == true && beforeMidnight) {
    console.log("Priming for reset...");
    resetYet = false;
  }

  /*
   * for debugging - print a line at each iteration
   */
  //console.log("...");
}

// Running CloudFunctions on it's own
/*
console.log("Running reset hug count script...");
console.log(
  "This script will reset users' hug counts at midnight PST, and will check the time in 1-minute intervals.\n"
);
setInterval(dailyReset, minuteInMS);
*/
