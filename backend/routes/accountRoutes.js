// Require
const express = require("express");
const { ManageAccountAPI } = require("../model/ManageAccount");
const router = express.Router();
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

// Routes
// VERIFIED
router.put("/changePassword/:id", async (req, res) => {
  let response = await ManageAccountAPI.changePassword(
    req.params.id,
    req.body.newPassword
  );
  if(response.out) {
    res.status(200).json(response);
  } else {
    console.log(response.data);
    res.status(400).send(
      'Something went wrong when changing the user\'s password'
    );
  }
});

// VERIFIED
router.delete("/deleteAccount/:id", async (req, res) => {
  // console.log(req.params.id);
  let response = await ManageAccountAPI.deleteAccount(req.params.id);
  if(response.out) {
    res.status(200).json(response);
  } else {
    console.log(response.data);
    res.status(400).send(
      'Something went wrong when deleting the user\'s account'
    );
  }
});

// VERIFIED
router.put('/forgotPassword', async (req, res) => {
  const { email } = req.body;
  let response = await ManageAccountAPI.forgotPassword(email);
  if (response.out) {
    res.status(200).json(response);
  } else {
    res.status(400).send(
      'Something went wrong when sending the password reset email'
    );
  }
});

module.exports = router;
