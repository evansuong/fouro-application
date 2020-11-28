const express = require("express");
const { route } = require("./usersRoutes");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

//router.get("/signin", (req, res) => {});
// Routes
router.get("/getFriendStatus/:id", (req, res) => {});

router.get("/getFriends/:id", (req, res) => {});

router.post("/addFriend/:id", (req, res) => {});

router.post("/removeFriend/:id", (req, res) => {});

module.exports = router;
