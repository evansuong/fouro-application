// test_auth.js used to test frontend authentication features
var firebase = require("../../frontend/src/authentication/config");
var auth = require("../../frontend/src/authentication/Authentication");

/* WARNING! This tester will NOT WORK unless you go into 
 * config.js and Authentication.js (filepaths listed above)
 * and change the following: 
 *  
 *  IN AUTHENTICATION.JS...
 *  (at the top of the file)
 *  import "firebase/auth";                 -->         require("firebase/auth");
 *  import firebase from "./config";                    var firebase = require("./config");
 *   
 *  (at the bottom of the file)
 *  export default AuthAPI;                 -->         module.exports = {AuthAPI};
 * 
 * 
 *  IN CONFIG.JS...
 *   
 *  import firebase from "firebase/app";    -->         var firebase = require("firebase/app");
 * 
 *  export default firebase.initializeApp(firebaseConfig);      -->        module.exports = firebase.initializeApp(firebaseConfig);
 *  
 */

var currentUser;
var uid;

// ~~~~~ TEST USER CREATION ~~~~~
async function t_RegisterUser(){
    var email = "example@email.com"
    var password = "test_password"

    currentUser = await auth.AuthAPI.registerUser(email, password)
    uid = currentUser ? currentUser.uid : ""
    if( uid == "" ) {
        console.log("User was not created.")
        console.log("Branching to login tests.")
    } else {
        console.log("User created: ", uid);
        console.log("Branching to logout tests.")
    }
    
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ~~~~~ TEST LOGGING IN/OUT ~~~~~
async function t_LoginUser(){
    // test invalid email
    currentUser = await auth.AuthAPI.loginUser("", "");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"\", \"\"): ", uid);

    currentUser = await auth.AuthAPI.loginUser("asdfkjeopkjzf", "");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"asdfkjeopkjzf\", \"\"): ", uid);

    currentUser = await auth.AuthAPI.loginUser("asdfkjeopkjzf@gmail.com", "");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"asdfkjeopkjzf@gmail.com\", \"\"): ", uid);

    currentUser = await auth.AuthAPI.loginUser("example@email.com", "");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"example@email.com\", \"\"): ", uid);

    currentUser = await auth.AuthAPI.loginUser("example@email.com", "abc");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"example@email.com\", \"abc\"): ", uid);

    currentUser = await auth.AuthAPI.loginUser("example@email.com", "test_password");
    uid = currentUser ? currentUser.uid : ""
    console.log("Login (\"example@email.com\", \"test_password\"): ", uid);

    console.log("uid value for the last test should not be null.\n")
}

async function t_Logout(){
    await auth.AuthAPI.logout();

    if(firebase.auth.currentUser == null) {
        console.log("\nUser logged out successfully\n")
    } else {
        console.log("\nUser was not logged out successfully.  uid: ", currentUser.uid, "\n")
    }
    
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~ TEST LOGIN DETECTION ~~~~~
async function t_checkLoggedIn(){
    await auth.AuthAPI.logout();
    if(auth.AuthAPI.checkLoggedIn()) { console.log("\ncheckLoggedIn() returned true after logging out.\n") }

    await auth.AuthAPI.loginUser("example@email.com", "test_password");
    if(!auth.AuthAPI.checkLoggedIn()) { console.log("\ncheckLoggedIn returned false after logging in.\n") }

    console.log("\nCheckLoggedIn works!\n")
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function separator(n, name) {
    for(i = 0; i < n; i++) {
        console.log("~")
    }
    console.log("~\t\t", name.toUpperCase())
    for(i = 0; i < n; i++) {
        console.log("~")
    }
}

async function main(){
    var sepSize = 3
    // currentUser and uid are null
    separator(sepSize, "Registration Tests")
    await t_RegisterUser()

    if(currentUser == null) {   // user was not created.  need to login then logout
        // currentUser is null
        separator(sepSize, "Login Tests")
        await t_LoginUser()
        // currentUser and uid are not null
        separator(sepSize, "Logout Tests")
        await t_Logout()
    } else {
        // currentUser and uid are not null
        separator(sepSize, "Logout Tests")
        await t_Logout()
        // currentUser is null
        separator(sepSize, "Login Tests")
        await t_LoginUser()
    }
    
    separator(sepSize, "Logged-In Status Tests")
    await t_checkLoggedIn()

    separator(sepSize, "Tests Complete!")
}

main();