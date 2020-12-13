import axios from "axios";

const server = "http://192.168.1.234:3000";

const onAccept = (res, response) => {
  console.log('API 6 accepting');
  console.log('API 7', response);
  response.status = true;
  response.data = res.data;
};

const onReject = (err, response) => {
  console.log('API 12 rejecting');
  console.log('API 13', response);
  console.log(err.code);
  console.log(err.message);
  console.log(err.stack);
  response.status = false;
  response.data = err.code;
};

export const ReadAPI = {
  test: function () {
    console.log("in axios");
    return axios.get(`${server}/users/testRoute`);
  },
  getHugPinnedState: async function (uid, hugId) {
    let response = {};
    await axios.get(`${server}/corkboard/getPinnedState/${uid},${hugId}`)
    .then((res) => onAccept(res, response))
    .catch((err) => onReject(err, response));
    return response;
  },
  getUserProfile: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/users/getUserProfile/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getUserCounts: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/users/getUserCounts/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getNotifications: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/notifications/getNotifications/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getUserHugs: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/hugs/getUserHugs/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getHugById: async function (uid, hugId) {
    // request: { hugId }
    let response = {};
    await axios
      .get(`${server}/hugs/getHugById/${uid},${hugId}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  buildCorkboard: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/corkboard/buildCorkboard/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getFriendStatus: async function (uid, friendId) {
    //TODO
    let response = {};
    await axios
      .get(`${server}/friends/getFriendStatus/${uid},${friendId}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getFriends: async function (uid) {
    let response = {};
    await axios
      .get(`${server}/friends/getFriends/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  getFriendProfile: async function (uid, friendId) {
    let response = {};
    await axios
      .get(`${server}/friends/getFriendProfile/${uid},${friendId}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  searchFriends: async function (uid, name) {
    //TODO: ?
    // request: { name }
    let response = {};
    await axios
      .get(`${server}/friends/searchFriends/${uid},${name}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  searchUsers: async function (uid, username) {
    //TODO
    // request: { name }
    let response = {};
    await axios
      .get(`${server}/friends/searchUsers/${uid},${username}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
};

export const CreateAPI = {
  createUser: async function (uid, request) {
    // request: { username, firstName, lastName }
    let response = {};
    await axios
      .post(`${server}/users/createNewUser/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  sendFriendRequest: async function (uid, request) {
    // TODO
    // request: { friend_id }
    let response = {};
    await axios({
      method: "post",
      url: `${server}/notifications/sendFriendRequest/${uid}`,
      data: { friend_id: request },
    })
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  sendHugRequest: async function (uid, request) {
    // request: { friend_id, hug_id }
    let response = {};
    await axios
      .post(`${server}/notifications/sendHugRequest/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  createHug: async function (uid, request) {
    // request: { friendId, message, blobs }
    let response = {};
    await axios
      .post(`${server}/hugs/createHug/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  respondToHug: async function (uid, request) {
    // request: { hugId, message, blobs }
    let response = {};
    await axios
      .post(`${server}/hugs/respondToHug/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  addFriend: async function (uid, request) {
    let response = {};
    await axios
      .post(`${server}/friends/addFriend/${uid},${request}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
};

export const UpdateAPI = {
  updateUserProfile: async function (uid, request) {
    // request: { username, firstName, lastName }
    let response = {};
    await axios
      .put(`${server}/users/updateUserProfile/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  uploadUserProfilePicture: async function (uid, request) {
    // request: { blob }
    let response = {};
    await axios
      .put(`${server}/users/uploadUserProfilePicture/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  changePassword: async function (uid) {
    let response = {};
    await axios
      .put(`${server}/account/changePassword/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  pin: async function (uid, request) {
    // request: { userHugId }
    let response = {};
    await axios
      .put(`${server}/corkboard/pin/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  unpin: async function (uid, request) {
    // request: { userHugId }
    let response = {};
    await axios
      .put(`${server}/corkboard/unpin/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  forgotPassword: async function (request) {
    console.log('API 229', request);
    let response = {};
    await axios
      .put(`${server}/account/forgotPassword`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
};

export const DeleteAPI = {
  deleteNotification: async function (uid, request) {
    // request = { notificationId }
    let response = {};
    await axios({
      method: "delete",
      url: `${server}/notifications/deleteNotification/${uid}`,
      data: {
        notificationId: request,
      },
    })
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  dropAHug: async function (uid, request) {
    // request: { requestId, hugId } where requestId is the
    // notificationId (?)
    let response = {};
    await axios
      .delete(`${server}/hugs/dropAHug/${uid}`, request)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  deleteAccount: async function (uid) {
    let response = {};
    await axios
      .delete(`${server}/account/deleteAccount/${uid}`)
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
  removeFriend: async function (uid, request) {
    // request: { friendId }
    let response = {};
    await axios({
      method: "delete",
      url: `${server}/friends/removeFriend/${uid}`,
      data: {
        friendId: request,
      },
    })
      .then((res) => onAccept(res, response))
      .catch((err) => onReject(err, response));
    return response;
  },
};
