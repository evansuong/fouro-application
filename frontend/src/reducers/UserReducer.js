
export default function userReducer(state, action) {
  switch(action.type) {
    case 'SET_UID':
      console.log('User logged in as: ', action.payload)
      return Object.assign({}, {...state, uid: action.payload});

    case 'SET_USER_DATA':
      console.log('Userdata setting to ', action.payload)
      return Object.assign({}, {...state, userData: action.payload})

    case 'TOGGLE_THEME':
      return Object.assign({}, {...state, isLightTheme: !state.isLightTheme})

    case 'LOG_OUT':
      return Object.assign({}, {...state, userData: undefined,  uid: undefined })

    case 'INCREMENT_STREAK_COUNT':
      return Object.assign({}, 
        {...state,  
          userData: {
            ...state.userData, 
            streakCount: action.payload.streakCount, 
            hugCount: action.payload.hugCount
          }
        })
    default:
      return state;
  }
}