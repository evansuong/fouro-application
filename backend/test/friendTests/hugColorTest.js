// Friends file for Creating, Reading, Updating, and Deleting
// Friends and Friend Management
var admin = require("firebase-admin");
const { machineLearning } = require("../../firebase/admin");
var firebase = require("../../firebase/admin");
require("firebase/firestore");

// Firestore
const db = firebase.firestore();
const usersCollection = db.collection("users");

// Friend Color Constants
const COLOR1 = "#FE5951";
const COLOR2 = "#FC6C58";
const COLOR3 = "#FA7D5D";
const COLOR4 = "#F88E63";
const COLOR5 = "#F69D68";
const COLOR6 = "#EFBA7C";
const COLOR7 = "#EFCF7C";
const COLOR8 = "#EFD67C";

// Helper Functions
function calculateFriendColor(last_hug_date) {
  // Testing
  console.log(last_hug_date.seconds);
}

async function main() {
  const cityRef = usersCollection
    .doc("example@email.com")
    .collection("friends")
    .doc("otherguy@email.com");

  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    calculateFriendColor(doc.get("last_hug_date"));
  }
}

//main();

/*
let diff = 100000;
switch (diff) {
  case diff > 864000: // > 10 days
    return COLOR1;
  case diff > 604800: // > 7 days
    return COLOR2;
  case diff > 518400: // > 6 days
    return COLOR3;
  case diff > 432000: // > 5 days
    return COLOR4;
  case diff > 345600: // > 4 days
    return COLOR5;
  case diff > 259200: // > 3 days
    return COLOR6;
  case diff > 172800: // > 2 days
    return COLOR7;
  default:
    // < 2 days
    return COLOR8;
}

*/
async function main2() {
  const userRef = usersCollection.doc("example@email.com");
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }
}

main2();
