const express = require("express");
const router = express.Router();

var firebase = require("../firebase/admin");
var firebase2 = require('../firebase/config');
const cors = require("cors");
const { UsersAPI, HugCountAPI } = require("../model/Users");

const db = firebase.firestore();
const usersCollection = db.collection("users");

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());
router.use(cors());

/*
// Test Template
router.get("/getUser/:id", (req, res) => {
  var json = Users.UserAPI.getUser(req.body.user);
  res.status(200).json(json);
});

router.post("/createUser/:id", (req, res) => {
  var out = {
    output: req.body.user,
  };
  var id = req.params.id;
  console.log(id);
  console.log(out.output);
  res.status(200).json();
});
*/

async function retrieveUserData(req, res, uid) {
  const userRef = usersCollection.doc(uid);
  const user = await userRef.get();
  if (!user.exists) {
    res.status(400).send('No user with the provided UID was found');
    return undefined;
  }
  req.body.userRef = userRef;
  return user.data();
}

function checkBody(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send('Missing JSON request body');
    return;
  }
  next();
}

// TESTING ROUTE FOR GETTING HTTP REQUESTS WORKING
router.get('/testRoute', async (req, res) => {
  res.status(200).send('Working');
})

// Routes
// VERIFIED
router.post("/createNewUser/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { username, firstName, lastName } = req.body;

  if (!username || !firstName || !lastName) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    const response = await UsersAPI.createNewUser(
      uid, username, firstName, lastName
    )
    res.status(200).json(response);
  }
});

// VERIFIED
router.get("/getUserProfile/:id", async (req, res) => {
  const uid = req.params.id;
  const response = await UsersAPI.getUserProfile(uid);
  res.status(200).json(response);
});

// VERIFIED
router.put("/updateUserProfile/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { username, firstName, lastName } = req.body;

  if (!username && !firstName && !lastName) {
    res.status(400).send('All required fields are null');
    return;
  } else {
    const response = UsersAPI.updateUserProfile(
      uid, username, firstName, lastName
    )
    if (response.out) {
      res.status(200).json({ out: true });
    } else {
      res.status(400).json({ out: false });
    }
  }
});

// VERIFIED
router.get("/getUserCounts/:id", async (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    res.status(400).send('Request has missing fields');
  } else {
    const countResponse = await HugCountAPI.getUserCount(uid);
    res.status(200).json(countResponse);
  }
});

// TODO: BROKEN. WORKING ON UPLOADING BLOB 
router.put('/uploadUserProfilePicture/:id', checkBody, async (req, res) => {
  console.log('In route');
  const uid = req.params.id;
  const { blob } = req.body;

  console.log(blob);
  
  if (!uid || !blob) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    const response = await UsersAPI.uploadUserProfilePicture(
      uid, blob
    )
    res.status(200).json({ out: 'success' })
  }
})

module.exports = router;
