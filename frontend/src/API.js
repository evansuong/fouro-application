import axios from 'axios';

const server = 'http://192.168.4.66:3000'

const API = {
  test: function() {
    console.log('in axios');
    return axios.get(`${server}/users/testRoute`);
  },
  getUserProfile: function(uid) {
    console.log('herre')
    return axios.get(`${server}/users/getUserProfile/${uid}`);
  },
  createUser: async function(user) {
    console.log('in axios api');
    let response = {}
    console.log(user.uid)
    await axios.post(`${server}/users/createNewUser/${user.uid}`, user, { timeout: 20000 })
    .then(res => {
      response = {
        status: true,
        data: res.data
      }
    })
    .catch(err => {
      console.log(err.code);
      console.log(err.message);
      console.log(err.stack);
      response = {
        status: false,
        data: err.code
      }
    });

    return response
  },
  uploadUserProfilePicture: async function(uid, request) {
    let response = {}
    await axios.post(`${server}/users/uploadUserProfilePicture/${uid}`, request)
    .then(res => {
      response = {
        status: true,
        data: res.data
      }
    })
    .catch(err => {
      console.log(err.code);
      console.log(err.message);
      console.log(err.stack);
      response = {
        status: true,
        data: err.code
      }
    });

    return response
  }
}

export default API;