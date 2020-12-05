// Require
const express = require("express");
const ManageAccountAPI = require("../model/ManageAccount");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
// TODO: NOT TESTED
router.put("/changePassword/:id", (req, res) => {
  let response = ManageAccountAPI.changePassword(
    req.params.id,
    req.body.newPassword
  );
  res.status(200).json(response);
});

// VERIFIED
router.delete("/deleteAccount/:id", (req, res) => {
  console.log(req.params.id);
  let response = ManageAccountAPI.deleteAccount(req.params.id);
  res.status(200).json(response);
});

module.exports = router;
