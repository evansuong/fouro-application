// Main.js used to run and test functions
var firebase = require("../firebase/config");
require("firebase/auth");
var login = require("../model/account/LogIn");
var signup = require("../model/account/SignUp");
var Users = require("../model/Users");

async function main() {
  var current_user;
  current_user = await signup.SignupAPI.registerUser("evanjserrano@gmail.com", "password");
  //current_user = await login.LoginAPI.loginUser("evanjserrano@gmail.com", "password");

  console.log(current_user.uid);

  Users.UsersAPI.createNewUser(current_user).then( () => console.log("Created") );
  Users.UsersAPI.updateUserProfile(current_user, "evanjserrano", "Evan", "Serrano ").then( ()=> 
    console.log("Updated")
  );
}
//main();

async function main2() {
  var current_user;
  current_user = await login.LoginAPI.loginUser("evanjserrano@gmail.com", "password");

  console.log(current_user.uid);

  Users.UsersAPI.getUserProfile(current_user).then ( (data) => console.log(data));

  //console.log(":(");
  //console.log(JSON.stringify(data));
}

main2();
