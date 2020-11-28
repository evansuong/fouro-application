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
route.get("/getFriendStatus/:id", (req, res) => {});

route.get("/getFriends/:id", (req, res) => {});

route.post("/addFriend/:id", (req, res) => {});

route.post("/removeFriend/:id", (req, res) => {});

module.exports = router;
