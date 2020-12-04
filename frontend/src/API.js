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
    return axios.post(`${server}/users/createNewUser/${user.uid}`, user);
  },
  uploadUserProfilePicture: function(request) {
    return axios.put(
      `${server}/users/uploadUserProfilePicture/${request.uid}`, 
      request
    );
  }
}

export default API;