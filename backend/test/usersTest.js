var Users = require("../model/Users");
var auth = require("../../frontend/src/authentication/Authentication");
const readline = require('readline');

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



var uid;
var response;

/*
 *
 *      USER TESTS
 * 
 */
async function t_createNewUser(){
    //initialize user information
    var email = "evanjserrano@gmail.com"
    var password = "testpass"
    var username = "evaniscool2000"
    var first = "Evan"
    var last = "Serrano"

    // attempt registration
    response = await auth.AuthAPI.registerUser(email, password);
    uid = response.data;
        
    // login if registration fails
    if( !auth.AuthAPI.checkLoggedIn() ) {
        console.log("Registration failed... logging in.");
        response = await auth.AuthAPI.loginUser(email, password);
        uid = response.data;

        // call updateUser
        response = await Users.UsersAPI.updateUserProfile(
            uid,
            username,
            first,
            last
        );
    } else {
        // call createNewUser
        response = await Users.UsersAPI.createNewUser(
            uid,
            username,
            first,
            last
        );
    }

    
    if(response.out == true) {
        console.log("yay! user created/updated");
    } else {
        console.log("Something went wrong in createNewUser.")
    }
}


async function t_updateUserProfile() {
    var newUsername = "newEvanPostUpdate"
    var newFirstname = "Ivan"
    var newLastname = "Sirrano"
    response = await Users.UsersAPI.updateUserProfile(
        uid,
        newUsername,
        newFirstname,
        newLastname
    );
    if(response.out == true) {
        console.log("yay! user info updated");
    } else {
        console.log("Something went wrong in updateUserProfile.")
    }
}


async function t_dupUsername() {
    var uid2 = "evan impostor O_O"
    var dupUsername = "newEvanPostUpdate"
    var first = "Iefan"
    var last = "Sriracha"
    response = await Users.UsersAPI.createNewUser(
        uid2,
        dupUsername,
        first,
        last
    )

    if(response.out == true) {
        console.log("Error was not caught.  Something is wrong in createNewUser.")
    } else {
        console.log("Duplicate username was blocked.  YAY!")
    }


    response = await Users.UsersAPI.createNewUser(
        uid2,
        "totallynotEvanSerrano",
        first,
        last
    )

    response = await Users.UsersAPI.updateUserProfile(
        uid2,
        dupUsername,
        first,
        last
    )

    if(response.out == true) {
        console.log("Error was not caught.  Something is wrong in updateUserProfile.")
    } else {
        console.log("Duplicate username was blocked.  YAY!")
    }
}


async function t_getUserProfile() {
    response = await Users.UsersAPI.getUserProfile(uid);
    
    if(response != null) {
        console.log("yay! user profile retrieved: " + JSON.stringify(response))
    } else {
        console.log("Something went wrong in getUserProfile.")
    }
}


/*
 *
 *          HUG TESTS
 *  
 */

async function t_getUserCounts() {
    response = await Users.HugCountAPI.getUserCounts(uid);
    console.log(JSON.stringify(response));
    if(response != null) {
        console.log("yay! hug stats retrieved: \n\thug count: " + response.hug 
                                            + "\n\tstreak count: " + response.streak);
    } else {
        console.log("something went wrong in getUserCounts.")
    }
}

async function t_increaseHugCount() {
    response = await Users.HugCountAPI.increaseHugCount(uid);
    var usercounts = await Users.HugCountAPI.getUserCounts(uid);

    if(response.out == true) {
        console.log("yay! new hug stats: \n\thug count: " + usercounts.hug
                                        + "\n\tstreak count: " + usercounts.streak);
    } else {
        console.log("something went wrong in increaseHugCount.")
    }
}



// ~~~~~~~~ Functions for running the tester ~~~~~~~~~

function pause(prompt) {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => r1.question(prompt, ans => {
        r1.close();
        resolve(ans);
    }))
}

function separator(n, name) {
    for(i = 0; i < n; i++) {
        console.log("~")
    }
    console.log("~\t\t", name.toUpperCase())
    for(i = 0; i < n; i++) {
        console.log("~")
    }
}

async function main() {
    var sepSize = 3
    separator(sepSize, "User Creation Test")
    await pause("Press enter to continue.\n")
    await t_createNewUser()

    separator(sepSize, "Profile Update Test")
    await pause("Press enter to continue.\n")
    await t_updateUserProfile()

    separator(sepSize, "Duplicate Username Test")
    await pause("Press enter to continue.\n")
    await t_dupUsername()

    separator(sepSize, "Get Profile Test")
    await pause("Press enter to continue.\n")
    await t_getUserProfile()

    separator(sepSize * 2, "Moving to user hug tests...")
    console.log("\n")

    separator(sepSize, "Get Hug/Streak Count Test")
    await pause("Press enter to continue.\n")
    await t_getUserCounts()

    separator(sepSize, "Increment Hug/Streak Count Test")
    await pause("Press enter to continue.\n")
    await t_increaseHugCount()
}

main();