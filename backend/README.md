# Firebase Backend

## Setup

1.  Configure Firebase Admin SDK Service Account

    1. Go to the Firebase Project and click Settings > Project Settings

    2. Under the "Service Accounts" tab, click the "Generate New Private Key" button

    3. Download the JSON file and put it in the [./backend/firebase](./backend/firebase) folder

    4. **IMPORTANT**: Rename the file to `serviceAccountKey.json`

2.  Install Node dependencies

        npm install

## Run the backend server

1.  Run the sever

        npm run server
