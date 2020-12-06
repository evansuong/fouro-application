const express = require("express");
const router = express.Router();
const cors = require("cors");
const { FriendsAPI, FriendSearchAPI } = require("../model/Friends");

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());
router.use(cors());

function checkBody(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send("Missing JSON request body");
    return;
  }
  next();
}

// Routes
// TODO: NOT TESTED
router.delete("/removeFriend/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friendId } = req.body;

  if (!friendId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendsAPI.removeFriend(uid, friendId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: NOT TESTED
router.get("/getFriendStatus/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friendId } = req.body;

  if (!friendId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendsAPI.addFriend(uid, friendId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: NOT TESTED
router.get("/getFriends/:id", async (req, res) => {
  const uid = req.params.id;

  try {
    let response = await FriendsAPI.getFriendsList(uid);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(`An error occurred: ${err}`);
  }
});

// TODO: NOT TESTED
router.get("/getFriendProfile/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friendId } = req.body;

  if (!friendId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendsAPI.getFriendProfile(uid, friendId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: NOT TESTED
router.get("/searchFriends/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { name } = req.body;

  if (!name) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendSearchAPI.searchFriends(uid, name);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: NOT TESTED
router.get("/searchUsers/:id", checkBody, async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendSearchAPI.searchUsers(uid, username);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
