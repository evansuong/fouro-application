
export default function userReducer(state, action) {
  switch(action.type) {
    case 'SET_USER':
      // console.log('user logged in as: ', action.payload)
      return Object.assign({}, {...state, userData: action.payLoad});

    case 'TOGGLE_THEME':
      // console.log('toggling');
      return Object.assign({}, {...state, isLightTheme: !state.isLightTheme})
    case 'LOG_OUT':
      return Object.assign({}, {...state, userData: undefined, currentUser: { uid: undefined }})
    default:
      return state;
  }
}