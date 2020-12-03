// Backend http server for managing front end calls and
// connecting to firebase
const express = require("express");
const app = express();
const cors = require("cors");

// Including Routes
const account = require("../routes/accountRoutes");
const corkboard = require("../routes/corkboardRoutes");
const friends = require("../routes/friendsRoutes");
const hugs = require("../routes/hugsRoutes");
const notifications = require("../routes/notificationsRoutes");
const users = require("../routes/usersRoutes");

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

// Server
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
