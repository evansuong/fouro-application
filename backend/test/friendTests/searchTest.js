const { FriendSearchAPI } = require("../../model/Friends");
let Friends = require("../../model/Friends");

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
  let match = await Friends.FriendSearchAPI.searchUsers("example");
  console.log(match);
}
search2();
