const express = require("express");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

/*
// Test Template
router.get("/getUser/:id", (req, res) => {
  var json = Users.UserAPI.getUser(req.body.user);
  res.status(200).json(json);
});

router.post("/createUser/:id", (req, res) => {
  var out = {
    output: req.body.user,
  };
  var id = req.params.id;
  console.log(id);
  console.log(out.output);
  res.status(200).json();
});
*/
router.post("/createUser/:id", (req, res) => {
  var out = {
    output: req.body.user,
  };
  var id = req.params.id;
  console.log(id);
  console.log(out.output);
  res.status(200).json();
});
// Routes
router.post("/createNewUser/:id", (req, res) => {});

router.get("/getUserProfile/:id", (req, res) => {});

router.post("/updateUserProfile/:id", (req, res) => {});

router.get("/getUserCounts/:id", (req, res) => {});

module.exports = router;
