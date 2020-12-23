// Backend http server for managing front end calls and
// connecting to firebase
"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const pino = require("pino");

// Including Routes
const account = require("../routes/accountRoutes");
const corkboard = require("../routes/corkboardRoutes");
const friends = require("../routes/friendsRoutes");
const hugs = require("../routes/hugsRoutes");
const notifications = require("../routes/notificationsRoutes");
const users = require("../routes/usersRoutes");

// Server automated Cloud Functions
const CloudFunctionsAPI = require("../model/CloudFunctions");

// Logging Cloud Functions
const logger = pino({ level: process.nextTick.LOG_LEVEL || "warn" });

// Server Setup
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// Attaching Routes
app.use("/account", account);
app.use("/corkboard", corkboard);
app.use("/friends", friends);
app.use("/hugs", hugs);
app.use("/notifications", notifications);
app.use("/users", users);

// Cron - Cloud Function usage
cron.schedule("0 0 8 * * *", function () {
  // Run at 00:00:00 (00:00 PST) == (08:00 UTC)
  let d = new Date(Date.now());
  let timeString = d.toTimeString();
  logger.warn(`It's ${timeString}. Resetting all user hug counts :)`);
  CloudFunctionsAPI.resetUserHugCounts();
});

// Server
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
