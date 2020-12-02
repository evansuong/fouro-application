// Your Firebase service account can be used to authenticate multiple
// Firebase features, such as Database, Storage and Auth,
// programmatically via the unified Admin SDK.
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "cafe-fouro.appspot.com",
});
