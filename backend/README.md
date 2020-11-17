# Firebase Backend

## Setup

1.  Install [node.js](https://nodejs.org/en/)
2.  Setup Firebase Configuration from the cafe-fouro Firebase project

    1. Create a file in the [.firebase](./firebase) folder called `config.js`

    2. Paste this into `config.js`:

       ```
       // Firebase App (the core Firebase SDK) is always required and
       // must be listed before other Firebase SDKs
       import firebase from "firebase/app";

       // Cafe fouro Firebase Configuration
       /* Replace Firebase Config Snippet Here */

       export default firebase.initializeApp(firebaseConfig);
       ```

    3. Go to your Firebase console, find the cafe-fouro project, and navigate to the Project Overview page

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
    5. Paste the snippet into [./firebase/config.js](./firebase/config.js) replacing line 6:

       ```
       // Cafe fouro Firebase Configuration
       /* Replace Firebase Config Snippet HERE */
       ```

3.  Install Node dependencies

        npm install
