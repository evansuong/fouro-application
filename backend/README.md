# Firebase Backend

## Setup

1.  Install [node.js](https://nodejs.org/en/)

2.  Install Node dependencies

        npm install

## Testing Functions

1.  In the [./test](./test) folder, create a file that imports your functions from the model

        var modelFile = require("../model/modelFile");

2.  Call your functions and use `console.log` statements.

3.  Run your file using:

        node modelFile
