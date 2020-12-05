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
  const userRef = await usersCollection.doc(uid)
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
router.get("/getNotifications/:id", async (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    const response = NotificationsAPI.getNotifications(uid);
    res.status(200).json({ notifications: response });
  }
});

router.post("/deleteNotification/:id", async (req, res) => {

});

router.post("/sendFriendRequest", checkBody, async (req, res) => {
  const { uid, friend_id } = req.body;
  if (!uid || !friend_id) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    // TODO: DOES NOT BELONG HERE. BUT WE NEED TO RETREIVE USER
    // INFORMATION FOR BOTH SENDER AND RECEIVER SO WE CAN ADD
    // A PENDING AND RECEIVED NOTIFICATION FOR BOTH

    // Retrieve both users
    // const senderData = await retrieveUserData(req, res, uid);
    // if (!senderData) {
    //   return;
    // }
    // const senderRef = req.body.userRef;
    // const receiverData = await retrieveUserData(req, res, friend_id);
    // if (!receiverData) {
    //   return;
    // }
    // const receiverRef = req.body.userRef;
    // console.log('users retrieved');

    // const senderNotifLength = await notificationCollectionLength(req, uid);
    // const senderNotificationSnapshot = req.body.notificationSnapshot;
    // const receiverNotifLength = await notificationCollectionLength(req, friend_id);
    // const receiverNotificationSnapshot = req.body.notificationSnapshot;
  }
});

router.post("/createHugRequest/:id", (req, res) => {});

module.exports = router;
