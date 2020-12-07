
import React, { createContext, useReducer } from 'react';
import userReducer from '../reducers/UserReducer';

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [userData, dispatch] = useReducer(userReducer, { isLightTheme: true, currentUser: { uid: 'gary@email.com' } });
  
  return (
      <UserContext.Provider value={{ userData, dispatch }}> 
          {props.children}
      </UserContext.Provider>
  )
}