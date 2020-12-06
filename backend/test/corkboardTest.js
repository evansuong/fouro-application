let corkboard = require("../model/Corkboard");

async function testBuildCorkboard() {
  let test = await corkboard.CorkboardAPI.buildCorkboard("example@email.com");
  console.log(test);
}

async function testPinHug() {
  let test = await corkboard.PinAPI.pinHugToCorkboard(
    "example@email.com",
    "hug2"
  );
  console.log(test);
}
/*
async function testUnPinHug() {
    let test = await corkboard.PinAPI.unpinHugFromCorkboard("example@email.com", "hug1");
    console.log(test);
}
*/
testBuildCorkboard();