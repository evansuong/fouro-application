# Firebase Backend

## Setup

1.  Install [node.js](https://nodejs.org/en/)
2.  Setup Firebase Configuration from the cafe-fouro Firebase project

    1. Navigate to the Project Overview page

    2. Copy the Web app Firebase SDK snippet which should look something like:
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
    3. Paste the snippet into [./firebase/config.js](./firebase/config.js) replacing line 6:

       ```
       // Cafe fouro Firebase Configuration
       /* Replace Firebase Config Snippet Here */
       ```

3.  Install Node dependencies

        npm install
