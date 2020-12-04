let Friends = require("../../model/Friends");

/*
Friends.FriendsAPI.addFriend(
  "example@email.com",
  "TVIruf34pvT27kWPiPXHvahINrh2"
);
*/

// Friends.FriendsAPI.removeFriend("example@email.com", "lolol");

/*
async function statusCheck() {
  var status = await Friends.FriendsAPI.getFriendStatus(
    "example@email.com",
    "otherguy@email.com"
    //"TVIruf34pvT27kWPiPXHvahINrh2"
  );
  console.log("success " + status.out);
}
statusCheck();
*/
async function testGetFriend() {
  let test = await Friends.FriendsAPI.getFriendsList("example@email.com");
  console.log(test);
}
testGetFriend();
