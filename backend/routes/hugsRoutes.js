const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
router.post("/createHug/:id", (req, res) => {});

router.post("/respondToHug/:id", (req, res) => {});

router.post("/dropAHug/:id", (req, res) => {});

router.get("/getUserHugs/:id", (req, res) => {});

router.get("/getHug/:id", (req, res) => {});

module.exports = router;
