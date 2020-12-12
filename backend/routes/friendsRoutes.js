const express = require("express");
const router = express.Router();
const cors = require("cors");
const { FriendsAPI, FriendSearchAPI } = require("../model/Friends");
const { ViewHugAPI } = require('../model/Hugs');

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
router.post("/addFriend/:id,:friendId", async (req, res) => {
  const uid = req.params.id;
  const friendId = req.params.friendId;

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

router.delete("/removeFriend/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const friendId = req.body.friendId;

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

router.get("/getFriendStatus/:id,:friendId", async (req, res) => {
  const uid = req.params.id;
  const friendId = req.params.friendId;

  if (!friendId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendsAPI.getFriendStatus(uid, friendId);
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

router.get("/getFriendProfile/:id,:friendId", async (req, res) => {
  const uid = req.params.id;
  const friendId = req.params.friendId;

  if (!friendId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await ViewHugAPI.getSharedHugs(uid, friendId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.get("/searchFriends/:id,:query", async (req, res) => {
  const uid = req.params.id;
  const query = req.params.query;

  if (!query) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendSearchAPI.searchFriends(uid, query);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.get("/searchUsers/:id,:query", async (req, res) => {
  const uid = req.params.id;
  const query = req.params.query;

  if (!query) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      let response = await FriendSearchAPI.searchUsers(query);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
