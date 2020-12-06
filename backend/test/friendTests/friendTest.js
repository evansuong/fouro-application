let Friends = require("../../model/Friends");

/*
Friends.FriendsAPI.addFriend(
  "example@email.com",
  //"D3ExthKFKOf1D0gOrDqka0Y34Ik1"
  "otherguy@email.com"
);
*/

/*
Friends.FriendsAPI.removeFriend(
  "example@email.com",
  "D3ExthKFKOf1D0gOrDqka0Y34Ik1"
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
  console.log("success " + status.status);
}
statusCheck();
*/

async function testGetFriend() {
  let test = await Friends.FriendsAPI.getFriendsList("example@email.com");
  console.log(test);
}
//testGetFriend();

async function testFriendProfile() {
  let test = await Friends.FriendsAPI.getFriendProfile(
    "example@email.com",
    "TestManSupreme"
  );
  console.log(test);
}
testFriendProfile();
