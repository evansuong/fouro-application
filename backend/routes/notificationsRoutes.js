const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

//Routes
router.get("/getNotifications/:id", (req, res) => {});

router.post("/deleteNotification/:id", (req, res) => {});

router.post("/sendFriendRequest/:id", (req, res) => {});

router.post("/createHugRequest/:id", (req, res) => {});

module.exports = router;
