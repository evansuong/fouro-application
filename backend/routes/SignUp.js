import Fire from "../firebase/config";
import "firebase/firestore";
import "firebase/auth";

const db = Fire.firestore();
const usersCollection = db.collection('users');
const corkboardCollection = db.collection('corkboards')

const SignupAPI = {
  registerUser: async function(email, password) {
    let registered = false;
    let createdUser;
    await Fire.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      createdUser = user;
      registered = true;
      // console.log(`Registered: ${user}`);
    })
    .catch(function (error) {
      console.log('error');
      registered = false;
      var errorCode = error.code;
      var errorMessage = error.message;

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("The email is already in use.");
          break;

        case "auth/invalid-email":
          alert("The email is invalid.");
          break;

        case "auth/weak-password":
          alert("The password is too weak.");
          break;

        case "auth/operation-not-allowed":
        default:
          alert(errorMessage);
          break;
      }

      console.log(error);
    });

    return [registered, createdUser];
  },

  // TODO: INACCURATE/HARD-CODED FIELDS:
  // Profile pic, friends, hugs, chatrooms, corkboard_id
  createUserInCollection: async function(newUser, email, password) {
    let created = false;
    const newCorkboardRef = corkboardCollection.doc();
    // console.log('56', newUser);
    // console.log('57', newUser.user.uid);
    const user = {
      user_id: newUser.user.uid,
      email: email,
      password: password,
      username: '',
      first_name: '',
      last_name: '',
      profile_pic: '',
      day_hug_count: 0,
      current_streak: 0,
      friends: [],
      hugs: [],
      chatrooms: [],
      corkboard_id: newCorkboardRef.id,
    }

    const corkboard = {
      corkboard_id: newCorkboardRef,
      pinned_hugs: [],
    }
    
    await usersCollection.doc(`${newUser.user.uid}`).set(user).then(() => {
      console.log(`User created with ID: ${newUser.user.uid}`);
      created = true;
    })
    .catch((error) => {
      console.log(`Error adding user: ${error}`);
      created = false;
    });

    await newCorkboardRef.set(corkboard).then(() => {
      console.log(`Corkboard created with ID: ${newCorkboardRef.id}`);
      created = true;
    })
    .catch((error) => {
      console.log(`Error adding corkboard: ${error}`);
      created = false;
    })

    return created;
  }
}

export default SignupAPI;