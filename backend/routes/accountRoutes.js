const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
router.post("/resetPassword/:id", (req, res) => {});

router.post("/deleteAccount/:id", (req, res) => {});

module.exports = router;
