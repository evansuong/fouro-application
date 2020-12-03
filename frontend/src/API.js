import axios from 'axios';

const server = 'http://192.168.1.235:3000'

const API = {
  test: function() {
    console.log('in axios');
    return axios.get(`${server}/users/testRoute`);
  },
  getUserProfile: function(uid) {
    return axios.get(`${server}/users/getUserProfile/${uid}`);
  },
  createUser: function(user) {
    console.log('in axios api');
    axios.post(`${server}/users/createNewUser`, user, { timeout: 20000 })
    .then(response => {
      console.log(response.data);
      return;
    })
    .catch(err => {
      console.log(err.code);
      console.log(err.message);
      console.log(err.stack);
    });
  },
  uploadUserProfilePicture: function(request) {
    return axios.post(`${server}/users/uploadUserProfilePicture`, request);
  }
}

export default API;