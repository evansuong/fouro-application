const express = require("express");
const router = express.Router();
const cors = require("cors");

const { CorkboardAPI, PinAPI } = require("../model/Corkboard");

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());
router.use(cors());

function checkBody(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send('Missing JSON request body');
    return;
  }
  next();
}


//Routes
// TODO: NOT TESTED
router.get("/buildCorkboard/:id", async (req, res) => {
  const uid = req.params.id;

  try {
    const response = await CorkboardAPI.buildCorkboard(uid);
    res.status(200).json({ hugList: response });
  } catch(err) {
    res.status(400).send(`An error occurred: ${err}`);
  }
});

// TODO: NOT TESTED
router.post("/pin/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { userHugId } = req.body;

  if (!userHugId) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      const response = await PinAPI.pinHugToCorkboard(userHugId);
      res.status(200).json(response);
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: NOT TESTED
router.post("/unpin/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { userHugId } = req.body;

  if (!userHugId) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      const response = await PinAPI.unpinHugFromCorkboard(userHugId);
      res.status(200).json(response);
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
