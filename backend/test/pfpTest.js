var Users = require("../model/Users");
var auth = require("../../frontend/src/authentication/Authentication");
var firebase = require("../firebase/config");
require("firebase/storage");
const readline = require('readline');
global.XMLHttpRequest = require("xhr2");

var fs = require("fs");



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
    //initialize user information
    var response;
    var uid;
    var email = "testersupreme@gmail.com"
    var password = "testpass"
    var username = "mistertesterman"
    var first = "Tester"
    var last = "McTestah"

    // attempt registration
    response = await auth.AuthAPI.registerUser(email, password);
    uid = response.data;

    if(uid == null) {
        response = await auth.AuthAPI.loginUser(email, password);
        uid = response.data;
    }

    response = await Users.UsersAPI.createNewUser(
        uid,
        username,
        first,
        last
    );

    if(response.out == false) {
        response = await Users.UsersAPI.updateUserProfile(
            uid,
            username,
            first,
            last
        );
    }

    // generate base64 from file and pass it in to uploadUserProfilePicture
    let file;
    try {
        const data = fs.readFileSync("storageTest/file.base64", "utf8");
        file = data;
    } catch (err) {
        console.error(err);
    }

    response = await Users.UsersAPI.uploadUserProfilePicture(uid, file)

    if(response == true) {
        console.log("YAAAAAY you uploaded it at: " + response.url);
    } else {
        console.log("I am literally going to cry right now")
    }
}

main();