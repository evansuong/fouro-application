import React from 'react';
import MainNavPage from './src/pages/MainNavPage';
import AddFriendPage from './src/pages/AddFriendPage';
import CreateHugPage from './src/pages/CreateHugPage';
import FriendHistoryPage from './src/pages/FriendHistoryPage';
import FriendProfilePage from './src/pages/FriendProfilePage';
import CorkboardPage from './src/pages/CorkboardPage';
import HugInfoPage from './src/pages/HugInfoPage';
import LoginPage from './src/pages/LoginPage';
import LaunchPage from './src/pages/LaunchPage';
import SignupPage from './src/pages/SignupPage';
import ProfileSetupPage from './src/pages/ProfileSetupPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Nav Page" component={MainNavPage} />
        <Stack.Screen name="Create Hug" component={CreateHugPage} />
        <Stack.Screen name="Add Friend" component={AddFriendPage} />
        <Stack.Screen name="Friend History" component={FriendHistoryPage} />
        <Stack.Screen name="Friend Profile" component={FriendProfilePage} />
        <Stack.Screen name="Corkboard" component={CorkboardPage} />
        <Stack.Screen name="Hug Info" component={HugInfoPage} />
        <Stack.Screen name='Login Page' component={LoginPage} />
        <Stack.Screen name='Signup Page' component={SignupPage} />
        <Stack.Screen name='Launch Page' component={LaunchPage} />
        <Stack.Screen name='Profile Setup Page' component={ProfileSetupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}