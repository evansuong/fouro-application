// Corkboard file for Creating, Reading, Updating, and
// Deleting corkboard hugs and corkboard Management
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");

// Firestore
const CorkboardAPI = {

    buildCorkboard: function() {

    }
}

const PinAPI = {

    pinHugToCorkboard: function(hugId) {

    },

    unpinHugFromCorkboard: function(hugId) {
        
    }
}

// Export the module
module.exports = {CorkboardAPI, PinAPI};
