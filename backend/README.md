# Firebase Backend

## Setup

1.  Install [node.js](https://nodejs.org/en/)
2.  Setup Firebase Configuration from the cafe-fouro Firebase project

    1. Create a file in the [./firebase](./firebase) folder called `config.js`

    2. Copy the contents of [./firebase/config-template.js](./firebase/config-template.js) into `config.js`:

       ```
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
       ```

    3. Go to your Firebase console, open the cafe-fouro project, and navigate to the Project Overview page

    4. Copy the Web app Firebase SDK snippet which should look something like:
       ```
        var firebaseConfig = {
            apiKey: "API-KEY-HERE",
            authDomain: "AUTH-DOMAIN-HERE",
            databaseURL: "DATABSE-URL-HERE",
            projectId: "cafe-fouro",
            storageBucket: "STORAGE-BUCKET-HERE",
            messagingSenderId: "MESSAGING-SENDER-ID-HERE",
            appId: "APP-ID-HERE"
        };
       ```
    5. Replace line 6 of `./firebase/config.js` with the project configuration.

3.  Install Node dependencies

        npm install
