import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { 
  createMaterialTopTabNavigator 
} from '@react-navigation/material-top-tabs';
import {
  useFocusEffect, 
  useIsFocused 
} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
// APIs
import { ReadAPI } from '../../API';
import AuthAPI from '../../authentication/Authentication';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Pages
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage';
import HomePage from './HomePage';

// Images/Assets
const homeFocused = require("assets/homeFocused.png");
const homeBlurred = require("assets/homeBlurred.png");
const friendsFocused = require("assets/friendsFocused.png");
const friendsBlurred = require("assets/friendsBlurred.png");
const notifFocused = require("assets/notifFocused.png");
const notifBlurred = require("assets/notifBlurred.png");
const _ = require('lodash');

// TODO: follow the gradient thing
export default function MainNavPage({ navigation, route }) {
  const Tab = createMaterialTopTabNavigator();
  // States
  const [fromLogin, setFromLogin] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { dispatch } = useContext(UserContext)

  // Misc
  const isFocused = useIsFocused();
  const { params } = route;
  const tabWidth = windowWidth / 3;
  const tabHeight = tabWidth / 2.25;

  useFocusEffect(() => {
    if(!isFocused) {
      // setRefresh(!refresh)
      console.log("refresh mainnavpage46", refresh)
    }
  })

  useEffect(() => {
    if (typeof params !== 'undefined' && params.loggedIn !== 'undefined') {
      if (!fromLogin) {
        setFromLogin(true)
        setLoading(false);
        setTimeout(() => {
          Alert.alert('Logged In!');
        }, 10)
      }
    }

    // persistent credentials
    if(!fromLogin) {
      setFromLogin(true);
      const email = _.get(route, "params.email");
      const password = _.get(route, "params.password");
      
      if(email && password) {
        login(email, password);
      }
    }
  }, [isFocused])

  const login = async (email, password) => {
    let response = await AuthAPI.loginUser(email.trim(), password.trim());
    await processLoginResponse(response);
    setRefresh(true);
    setLoading(false);
  }

  const processLoginResponse = async (response) => {
    if (response.status) {
      const { status, data } = await ReadAPI.getUserProfile(response.data);
      if (status) {
        dispatch({
          type: "SET_USER_DATA",
          payload: data,
        });
        dispatch({
          type: 'SET_UID',
          payload: response.data,
        })
      } else {
        Alert.alert('An error occurred');
      }
    } else {
      alert("No users found with those credentials")
    }
  }  
  
  return (
    <>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <Tab.Navigator
        sceneContainerStyle={styles.tabScreen}
        style={styles.tabNav}
        tabBarPosition="bottom"
        initialRouteName="Hug Feed"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            if (route.name === 'Hug Feed') {
              icon = focused ? homeFocused : homeBlurred
            } else if (route.name === 'Friends') {
              icon = focused ? friendsFocused : friendsBlurred
            } else if (route.name === 'Notifications') {
              icon = focused ? notifFocused : notifBlurred
            }
            
            return <Image 
              source={icon}
              resizeMode='stretch'
              style={{
                width: tabWidth,
                height: tabHeight
              }}
            />
          },
        })}
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          iconStyle: {
              justifyContent: 'center',
              alignItems: 'center',
          },
          style: {
            backgroundColor: '#F38977'
          },
          indicatorStyle: {
            backgroundColor: 'transparent'
          }
        }}
        beforeRemove={() => console.log('remove')}
        style={{ zIndex: -1 }}
      >        
        <Tab.Screen 
          name="Friends" 
          children={()=><FriendsPage navigation={navigation} route={route} refresh={refresh}/>}
          />
        <Tab.Screen 
          name="Hug Feed" 
          children={()=><HomePage navigation={navigation} route={route} refresh={refresh}/>}        
          />
        <Tab.Screen 
          name="Notifications" 
          children={()=><NotificationPage navigation={navigation} route={route} refresh={refresh}/>}        
          />
      </Tab.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  background: {
    position: 'absolute',
    width: '100%',
  },
  tabScreen: {
    backgroundColor: 'transparent',
    overflow: "visible",
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})