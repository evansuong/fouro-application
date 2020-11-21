// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Cafe fouro Firebase Configuration
var firebaseConfig = {
  apiKey: "API-KEY-HERE",
  authDomain: "AUTH-DOMAIN-HERE",
  databaseURL: "DATABSE-URL-HERE",
  projectId: "cafe-fouro",
  storageBucket: "STORAGE-BUCKET-HERE",
  messagingSenderId: "MESSAGING-SENDER-ID-HERE",
  appId: "APP-ID-HERE",
};

module.exports = firebase.initializeApp(firebaseConfig);
