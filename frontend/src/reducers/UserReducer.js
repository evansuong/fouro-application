
export default function userReducer(state, action) {
  switch(action.type) {
    case 'SET_USER':
      // console.log('user logged in as: ', action.payload)
      return action.payload;
    default:
      return state;
  }
}