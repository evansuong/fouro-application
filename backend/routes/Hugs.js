// Hugs file for Creating, Reading, Updating, and Deleting Hugs
import Fire from "../firebase/config";
import "firebase/storage"


// Firestore
export const db = Fire.firestore();

const CreateHugAPI = {
    
    // The user that calls this function is the sender
    createHug: function(friend_id, message, image) {
        // Set the date of the hug (also used to ID image)
        var dateTime = firebase.firestore.dateTime.now()
        var dateTimeString = dateTime.toString()
        // Image: byte array
        // Create a root reference
        var storageRef = firebase.storage().ref();
        // Create a unique image ID
        var imageName = "images/" + dateTimeString
        // Create a reference to the hug image (use when we download?)
        // var hugImageRef = storageRef.child(imageName)
        // Convert the byte array image to Uint8Array
        var bytes = new Uint8Array(image)
        var uploadTask = storageRef.child(imageName).put(bytes);
        // Add fields to the top level "hugs" collection
        db.collection("hugs").add({
            completed: true,
            date: dateTime,
            description_receiver: "",
            description_sender: message,
            images: [uploadTask],
            receiver_id: db.collection("users").doc(friend_id),
            sender_id: db.collection("users").doc(this)
        })
        // Add fields to "this"'s hug auto-ID document
        db.collection("users").doc(this).collection("hugs").add({
            cork_x_pos: 0,
            cork_y_pos: 0,
            date: dateTime, //dateTime is an actual DateTime object (timestamp?)
            friend: friend_id,
            hug_id: randomID,
            pinned: false
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

const UpdateHugAPI = {

    // The user that calls this function must be the receiver of a hug
    respondToHug: function(message, image) {
        
    },

    updateHugUsers: function(hug_id) {

    },

    dropAHug: function(request_id, hug_id) {

    },
}

const ViewHugAPI = {

    getHugById: function(hug_id) {

    },

    getUserHugs: function(){

    }
}