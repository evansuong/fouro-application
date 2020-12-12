// Cloud Functions that will reset User values at the end of the day
// This will be manually called to "simulate" the dawn of a new day (12AM)
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/auth");

const { HugCountAPI } = require("./Users");

const usersCollection = db.collection("users");

var resetYet = false;
const secondsInDay = 86400;
const pstOffset = 28800;



// helper function for resetting each user's hug count and streak
async function resetUserHugCount(snapshot) {
    hug_count = await snapshot.get("day_hug_count");
    streak_count = await snapshot.get("current_streak");
    userDocRef = snapshot.ref;

    const hugvars = {
        current_streak: streak_count,
        day_hug_count: 0
    }

    // reset the streaks of users who did not reach 4 hugs that day.
    if(hug_count < 4) {
        hugvars.current_streak = 0;
    }

    // reset the hug counts of all users.
    await userDocRef.update(hugvars);
}



async function dailyReset() {
    
    // check if Date.now is past midnight PST (most of our target demo is west coast) AND resetYet is false.
    let dateInMillis = Date.now();
    let dateInSeconds = Math.floor(dateInMillis / 1000) - pstOffset;

    // booleans to determine whether the current time is 0 -> 12 or 12 -> 24
    let beforeMidnight = dateInSeconds % secondsInDay >= secondsInDay / 2;
    let afterMidnight = dateInSeconds % secondsInDay >= 0 && !beforeMidnight;

    // case where hug counts have not yet been reset and it's past midnight
    if(resetYet == false && afterMidnight) {
        let usersQuery = usersCollection.get();

        await usersQuery.forEach(resetUserHugCount);

        // set resetYet to true
        resetYet = true;
    }

    if(resetYet == true && beforeMidnight) {
        resetYet = false;
    }

}


dailyReset();




// Export the module
//module.exports = { CloudFunctionsAPI }; // awaiting to be filled
