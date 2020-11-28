const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
routes.post("/createHug/:id", (req, res) => {});

routes.post("/respondToHug/:id", (req, res) => {});

routes.post("/dropAHug/:id", (req, res) => {});

routes.get("/getUserHugs/:id", (req, res) => {});

routes.get("/getHug/:id", (req, res) => {});

module.exports = router;
