const admin = require("../firebase/admin");
async function main() {
  let users = [];

  const listAllUsers = async function (nextPageToken) {
    // List batch of users, 1000 at a time.
    await admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          //console.log("user", userRecord.toJSON().uid);
          users = [...users, userRecord.toJSON().uid];
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  };

  // Start listing users from the beginning, 1000 at a time.
  await listAllUsers();
  //console.log(users);

  await admin
    .auth()
    .deleteUsers(users)
    .then((deleteUsersResult) => {
      console.log(
        `Successfully deleted ${deleteUsersResult.successCount} users`
      );
      console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
      deleteUsersResult.errors.forEach((err) => {
        console.log(err.error.toJSON());
      });
    })
    .catch((error) => {
      console.log("Error deleting users:", error);
    });
}

// main();
