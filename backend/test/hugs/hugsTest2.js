const Hugs = require("../../model/Hugs");

async function testDeleteImage(httpURL) {
    await Hugs.HugsAPI.deleteImage(httpURL);
}
testDeleteImage(
    "https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FIMG_8132.JPG?alt=media&token=0a988df7-7a40-408f-8f0b-195aebc36a23"
);
