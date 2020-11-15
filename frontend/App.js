import React from 'react';
import MainNavPage from './src/pages/main_nav/MainNavPage';
import AddFriendPage from './src/pages/main_nav/friends/AddFriendPage';
import CreateHugPage from './src/pages/main_nav/home/CreateHugPage';
import FriendHistoryPage from './src/pages/main_nav/friends/FriendHistoryPage';
import FriendProfilePage from './src/pages/main_nav/friends/FriendProfilePage';
import CorkboardPage from './src/pages/main_nav/home/CorkboardPage';
import HugInfoPage from './src/pages/main_nav/home/HugInfoPage';
import LoginPage from './src/pages/onboarding/LoginPage';
import LaunchPage from './src/pages/onboarding/LaunchPage';
import SignupPage from './src/pages/onboarding/SignupPage';
import PicUploadPage from './src/pages/onboarding/PicUploadPage';
import NamePage from './src/pages/onboarding/NamePage';
import QuestionPage from './src/pages/onboarding/QuestionPage';

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
        <Stack.Screen name='Pic Upload Page' component={PicUploadPage} />
        <Stack.Screen name='Name Page' component={NamePage} />
        <Stack.Screen name='Question Page' component={QuestionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}