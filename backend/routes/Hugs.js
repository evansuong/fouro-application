// Hugs file for Creating, Reading, Updating, and Deleting Hugs
import Fire from "../firebase/config";

// Firestore
export const db = Fire.firestore();

const HugsAPI = {
    createHug(friend_id, message, image)
}