const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
router.post("/removeFriend/:id", (req, res) => {});

router.get("/getFriendStatus/:id", (req, res) => {});

router.get("/getFriends/:id", (req, res) => {});

router.get("/getFriendProfile/:id", (req, res) => {});

router.get("/searchFriends/:id", (req, res) => {});

router.get("/searchUsers/:id", (req, res) => {});

module.exports = router;
