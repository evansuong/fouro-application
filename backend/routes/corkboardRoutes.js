const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

//router.get("/signin", (req, res) => {});
//Routes
router.get("/buildCorkboard/:id", (req, res) => {});

router.post("/pin/:id", (req, res) => {});

router.post("/unpin/:id", (req, res) => {});

module.exports = router;
