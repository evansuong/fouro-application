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
    res.status(400).send("Missing JSON request body");
    return;
  }
  next();
}

// Routes
router.get("/buildCorkboard/:id", async (req, res) => {
  const uid = req.params.id;
  console.log("corkboardRoutes 28", uid);

  try {
    const response = await CorkboardAPI.buildCorkboard(uid);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(`An error occurred: ${err}`);
  }
});

router.put("/pin/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { hug_id } = req.body;

  console.log("corkboardRoutes 43", uid, hug_id);

  if (!hug_id) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      const response = await PinAPI.pinHugToCorkboard(uid, hug_id);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.put("/unpin/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { hug_id } = req.body;

  console.log("corkboardRoutes 63", uid, hug_id);

  if (!hug_id) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      const response = await PinAPI.unpinHugFromCorkboard(uid, hug_id);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.get("/getPinnedState/:id,:hugId", async (req, res) => {
  const uid = req.params.id;
  const hug_id = req.params.hugId
  if (!hug_id) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      const response = await PinAPI.isPinned(uid, hug_id);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
