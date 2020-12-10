// Require
const express = require("express");
const ManageAccount = require("../model/ManageAccount");
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
  // console.log(req.params.id);
  let response = ManageAccountAPI.deleteAccount(req.params.id);
  res.status(200).json(response);
});

<<<<<<< HEAD
// TODO: NOT TESTED
router.put("forgotPassword", (req, res) => {
  let response = ManageAccountAPI.forgotPassword(req.body.email);
  res.status(200).json(response);
});
=======
router.put('/forgotPassword', async (req, res) => {
  const { email } = req.body;
  let response = await ManageAccountAPI.forgotPassowrd(email);
  if (response.out) {
    res.status(200).json(response);
  } else {
    res.status(400).send(
      'Something went wrong when sending the password reset email'
    );
  }
})
>>>>>>> 52831b8a0ecede3943b649d75b5a79061f80a254

module.exports = router;
