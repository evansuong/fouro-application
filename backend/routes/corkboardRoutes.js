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
route.get("/buildCorkboard/:id", (req, res) => {});

route.post("/pin/:id", (req, res) => {});

route.post("/unpin/:id", (req, res) => {});

module.exports = router;
