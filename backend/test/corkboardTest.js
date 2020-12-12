let corkboard = require("../model/Corkboard");

async function testBuildCorkboard() {
  let test = await corkboard.CorkboardAPI.buildCorkboard(
    //"example@email.com"
    "S8vFj9rMVSgFcqM9r1cFFQ1OZCw2"
  );
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
//testBuildCorkboard();

async function testIsPinned() {
  let test = await corkboard.PinAPI.isPinned("example@email.com", "hug2");
  console.log(test);

  test = await corkboard.PinAPI.isPinned(
    "example@email.com",
    "ZzWRpPFQ7dqwmecA2Qvm"
  );
  console.log(test);
}

testIsPinned();
