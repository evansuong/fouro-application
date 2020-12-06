
import { Dimensions } from 'react-native';
import React, { createContext, useReducer } from 'react';
import userReducer from '../reducers/UserReducer';


export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [userData, dispatch] = useReducer(userReducer, { isLightTheme: true, currentUser: { uid: 'example@email.com' } });
  
  return (
      <UserContext.Provider value={{ userData, dispatch }}> 
          {props.children}
      </UserContext.Provider>
  )
}