var ManageAccount = require("../model/ManageAccount");
var auth = require("../../frontend/src/authentication/Authentication");
const readline = require('readline');
/*
 *      Testing Flow:
 *      1. make an account
 *      2. sign out immediately
 *      3. change password from outside the account with "forgot password"
 *      4. sign in
 *      5. change password from within the app changePassword
 *      6. sign out
 *      7. sign-in with new password.
 *      6. delete the account
 *      7. try signing in to the deleted account.
 */ 

var response;
var uid;
var email = "evanjserrano@gmail.com"

// creates an account and signs it out immediately.
async function makeAccountAndSignOut() {
    var password = "testpass"

    // attempt registration
    response = await auth.AuthAPI.registerUser(email, password);
    uid = response.data;

    if( !auth.AuthAPI.checkLoggedIn() ) {
        console.log("Account already exists.  no need to sign out.");
    } else {
        auth.AuthAPI.logout();
    }
}

// call "forgot password"
async function t_forgotPassword() {
    var bademail = "blahgblahbaliewfjaoefjal@gmail.com"

    response = await ManageAccount.ManageAccountAPI.forgotPassword(bademail);
    console.log(JSON.stringify(response));
    if(response.out == false) {
        console.log("GOOD error: " + response.data);
    } else {
        console.log("Error was not caught.  Something went wrong in forgotPassword")
    }

    console.log("Sending password reset email...")
    response = await ManageAccount.ManageAccountAPI.forgotPassword(email);
    if(response.out == true) {
        console.log("Yay! Now go check your email Evan.");
    } else {
        console.log("Something went wrong in forgotPassword.")
    }
}

// sign in with the updated password
async function signInWithNewPassword(passParam) {
    response = await auth.AuthAPI.loginUser(email, passParam);
    uid = response.data;

    if(response.out == true) {
        console.log("Yay!  You managed to sign in with the new password.");
    } else {
        console.log("Something went wrong when logging in with the new password: " + response.data);
    }
}

// change password in-app
async function t_changePassword() {
    response = await ManageAccount.ManageAccountAPI.changePassword(uid, "password2");

    if(response.out == true) {
        console.log("Yay!  You changed your password in the app!");
    } else {
        console.log("Something went wrong when changing the password.");
    }
}


// delete your account
async function t_deleteAccount() {
    // delete Evan
    response = await ManageAccount.ManageAccountAPI.deleteAccount(uid);
    if(response.out == true) {
        console.log("Your account is gone forever ;_;... YAY");
    } else {
        console.log("Your account was not deleted... something went wrong.");
    }

    // try to log in to a deleted account
    response = await auth.AuthAPI.loginUser(email, "password2");
    if(response.out == false) {
        console.log("GOOD error, can't log in to a deleted account");
    } else {
        console.log("Error was not caught.  Something went wrong when attempting login after deleteAccount");
    }

    // try to delete a non-existing account
    response = await ManageAccount.ManageAccountAPI.deleteAccount(uid);
    if(response.out == false) {
        console.log("GOOD error, can't delete a nonexisting account");
    } else {
        console.log("Error was not caught.  Something went wrong when attempting to delete a nonexisting account");
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

    separator(sepSize, "Making account");
    await pause("Press enter to continue.\n");
    await makeAccountAndSignOut();

    separator(sepSize, "Sending forgot password email");
    await pause("Press enter to continue.\n");
    await t_forgotPassword();

    separator(sepSize, "sign-in with new password test");
    await pause("Press enter to continue.\n");
    await signInWithNewPassword("password");

    separator(sepSize, "Change password in-app test");
    await pause("Press enter to continue.\n");
    await t_changePassword();
    await auth.AuthAPI.logout();
    await signInWithNewPassword("password2");

    separator(sepSize, "Account Deletion Test.");
    await pause("Press enter to continue.\n");
    await t_deleteAccount();
    await signInWithNewPassword("password2");

    separator(sepSize, "Testing Complete!");
}

main();