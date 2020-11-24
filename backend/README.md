# Firebase Backend

## Setup

1.  Install [node.js](https://nodejs.org/en/)

2.  Configure Firebase Service Account

    1. Go to the Firebase Project and click Settings > Project Settings

    2. Under the "Service Accounts" tab, click the "Generate New Private Key" button

    3. Download the JSON file and put it in the [./backend/firebase](./backend/firebase) folder

    4. **IMPORTANT**: Rename the file to `serviceAccountKey.json`

3.  Install Node dependencies

        npm install

## Testing Functions

1.  In the [./test](./test) folder, create a file that imports your functions from the model

        var modelFile = require("../model/modelFile");

2.  Call your functions and feel free to use `console.log` statements.

3.  Run your file using:

        node modelFile

4.  Verify Firebase Project changes and console log statements
