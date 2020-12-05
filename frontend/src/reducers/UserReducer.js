
export default function userReducer(state, action) {
  switch(action.type) {
    case 'SET_USER':
      console.log('user logged in as: ', action.payload)
      return Object.assign({}, {...state, currentUser: action.payload})
    case 'TOGGLE_THEME':
      console.log('toggling theme...', state.isLightTheme)
      return Object.assign({}, {...state, isLightTheme: !state.isLightTheme})
    default:
      return state;
  }
}