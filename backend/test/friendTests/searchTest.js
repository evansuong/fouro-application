const { FriendSearchAPI } = require("../../model/Friends");
let Friends = require("../../model/Friends");
const firebase = require("../../firebase/admin");

const db = firebase.firestore();
let docRef = db.collection("users").doc("example@email.com");

//console.log(docRef);
//console.log(docRef.id);

//Friends.FriendSearchAPI.searchFriends("hi", "hHasdlkj");

//console.log("Hihi" == "Hihi ");

/*
async function search() {
  let match = await Friends.FriendSearchAPI.searchFriends(
    "example@email.com",
    "j1ne"
  );
  console.log(match);
}
search();
*/

async function search2() {
  let test = await Friends.FriendSearchAPI.searchUsers(
    "example@email.com",
    "evanjserrano"
  );
  console.log("should be 1 guy", test);
  let match = await Friends.FriendSearchAPI.searchUsers(
    "zbctIWFW8aO1Yg9ccK38w7ZDdP72",
    "evanjserrano"
  );
  console.log("should be empty", match);
}

search2();
