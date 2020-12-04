const express = require("express");
const router = express.Router();
const { HugsAPI, UpdateHugAPI, ViewHugAPI } = '../model/Hugs';

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());


function checkBody(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send('Missing JSON request body');
    return;
  }
  next();
}

async function retrieveUserData(req, res, uid) {
  const userRef = usersCollection.doc(uid);
  const user = await userRef.get();
  if (!user.exists) {
    res.status(400).send('No user with the provided UID was found');
    return undefined;
  }
  req.body.userRef = userRef;
  return user.data();
}

// const response = HugsAPI.createHug(uid, friend_id, message, blobs);

// Routes
// TODO: BROKEN. WORKING ON UPLOADING BLOB 
router.post("/createHug/:id", checkBody, (req, res) => {
  const uid = req.params.id;
  const { friend_id, message, blobs } = req.body;

  if (!friend_id || !message || !blobs) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.post("/respondToHug/:id", checkBody, (req, res) => {
  const uid = req.params.id;
  const { friend_id, message, blobs } = req.body;

  if (!friend_id || !message || !blobs) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.post("/dropAHug/:id", checkBody, (req, res) => {
  const uid = req.params.id;
  const { requestId, hugId } = req.body;

  if (!friend_id || !message || !blobs) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.get("/getUserHugs/:id", (req, res) => {
  const uid = req.params.id;

  if (!friend_id || !message || !blobs) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

router.get("/getHug/:id", checkBody, (req, res) => {
  const uid = req.params.id;
  const { friend_id, message, blobs } = req.body;

  if (!friend_id || !message || !blobs) {
    res.status(400).send('Request has missing fields');
    return;
  } else {
    try {
      
    } catch(err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
