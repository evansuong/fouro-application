import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';

import MainNavPage from './src/pages/main_nav/MainNavPage';
import OtherUserProfilePage from './src/pages/off-nav/OtherUserProfilePage';
import CorkboardPage from './src/pages/off-nav/CorkboardPage';
import HugInfoPage from './src/pages/off-nav/HugInfoPage';
import UserProfilePage from './src/pages/off-nav/UserProfilePage'

import LoginPage from './src/pages/onboarding/LoginPage';
import LaunchPage from './src/pages/onboarding/LaunchPage';
import SignupPage from './src/pages/onboarding/SignupPage';
import PicUploadPage from './src/pages/onboarding/PicUploadPage';
import NamePage from './src/pages/onboarding/NamePage';
import WelcomePage from './src/pages/onboarding/WelcomePage';
import ResetPasswordPage from './src/pages/off-nav/ResetPasswordPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateHugPage from './src/pages/off-nav/CreateHugPage'; 
import { DimensionContextProvider } from './src/contexts/DimensionContext';
import UserContextProvider from './src/contexts/UserContext'; 
import { useFonts } from 'expo-font'
import { 
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
} from '@expo-google-fonts/eb-garamond';


export default function App() {
  const Stack = createStackNavigator();

  const [mainNavPageTitle, setMainNavPageTitle] = useState("Main")
  // console.log('apprendered')
  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <UserContextProvider>
        <DimensionContextProvider>
          <NavigationContainer>
            <Stack.Navigator 
              style={styles.appContainer} 
              /** 
               * comment out the line below when you need the header for 
              /* going back to the previous screen. Leave it to see what 
              /* the app will actually look like
              * */
              screenOptions={{ headerShown: false }}
              initialRouteName="Main Nav Page"
            >
              <Stack.Screen 
                name="Main Nav Page" 
                component={MainNavPage} />

              <Stack.Screen 
                name="Create Hug" 
                component={CreateHugPage}/>

              <Stack.Screen 
                name="Friend Profile" 
                component={OtherUserProfilePage} />

              <Stack.Screen 
                name="Corkboard"
                component={CorkboardPage}/>

              <Stack.Screen 
                name="Hug Info" 
                component={HugInfoPage} />

              <Stack.Screen 
                name='Login Page' 
                component={LoginPage} />

              <Stack.Screen 
                name='Signup Page' 
                component={SignupPage}/>

              <Stack.Screen 
                name='Launch Page' 
                component={LaunchPage}/>

              <Stack.Screen 
                name='Pic Upload Page' 
                component={PicUploadPage}/>

              <Stack.Screen 
                name='Name Page' 
                component={NamePage}/>

              <Stack.Screen 
                name='Welcome Page' 
                component={WelcomePage}/>

              <Stack.Screen 
                name='User Profile Page'
                component={UserProfilePage}/>

              <Stack.Screen 
                name='Reset Password Page'
                component={ResetPasswordPage}/>

            </Stack.Navigator>
          </NavigationContainer>    
        </DimensionContextProvider>
      </UserContextProvider>   
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'transparent',
  }
})
