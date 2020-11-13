// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Cafe fouro Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyDxcxUVOMGwqW-tjwh_TFkSzs5SF3jn2E4",
  authDomain: "cafe-fouro.firebaseapp.com",
  databaseURL: "https://cafe-fouro.firebaseio.com",
  projectId: "cafe-fouro",
  storageBucket: "cafe-fouro.appspot.com",
  messagingSenderId: "821811898298",
  appId: "1:821811898298:web:a51f0c82e843a6126a9f83",
};

export default firebase.initializeApp(firebaseConfig);
