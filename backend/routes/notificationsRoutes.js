const express = require("express");
const router = express.Router();
var firebase = require("../firebase/admin");
require("firebase/firestore");
require("firebase/storage");
const cors = require("cors");

const { NotificationsAPI, RequestsAPI } = require("../model/Notifications");

const db = firebase.firestore();
const usersCollection = db.collection("users");

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());
router.use(cors());


async function retrieveUserData(req, res, uid) {
  const userRef = usersCollection.doc(uid)
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

async function notificationCollectionLength(req, uid) {
  var notificationCollection = usersCollection
    .doc(uid)
    .collection("notifications")
    .orderBy("date_time")
    // .limit(5);

  const notificationSnapshot = await notificationCollection.get();
  
  // Returns collection length
  req.body.notificationSnapshot = notificationSnapshot;
  console.log(notificationSnapshot.docs.length);
  return notificationSnapshot.docs.length;
}

//Routes
// VERIFIED
router.get("/getNotifications/:id", async (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    const notifResponse = await NotificationsAPI.getNotifications(uid);
    res.status(200).json({ notifications: notifResponse });
  }
});

// TODO: NOT STARTED
router.post("/deleteNotification/:id", checkBody, async (req, res) => {

});

// VERIFIED
router.post("/sendFriendRequest/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friend_id } = req.body;
  if (!uid || !friend_id) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      const userData = await retrieveUserData(req, res, uid);
      if (!userData) {
        res.status(400).send('Sender user not found');
        return;
      }
      const friendData = await retrieveUserData(req, res, friend_id);
      if (!friendData) {
        res.status(400).send('Receiving user not found');
        return;
      }
      const response = await RequestsAPI.sendFriendRequest(uid, friend_id);
      res.status(200).json({ response: response.out });
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// VERIFIED
router.post("/sendHugRequest/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friend_id, hug_id } = req.body;
  if (!uid || !friend_id || !hug_id) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      const userData = await retrieveUserData(req, res, uid);
      if (!userData) {
        res.status(400).send('Sender user not found');
        return;
      }
      const friendData = await retrieveUserData(req, res, friend_id);
      if (!friendData) {
        res.status(400).send('Receiving user not found');
        return;
      }
      const response = await RequestsAPI.sendHugRequest(uid, friend_id, hug_id);
      res.status(200).json({ response: response.out });
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
