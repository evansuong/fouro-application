/**
 * 
 * References:
 * https://reactnavigation.org/docs/stack-navigator/#headershown
 */

import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'
import { DimensionContext } from '../../contexts/DimensionContext';
import { useIsFocused } from '@react-navigation/native';


// TODO: follow the gradient thing
export default function MainNavPage({ route }) {
    const Tab = createMaterialTopTabNavigator();
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const [fromLogin, setFromLogin] = useState(false);
    const isFocused = useIsFocused();
    const { params } = route;

    const homeFocused = require("assets/homeFocused.png");
    const homeBlurred = require("assets/homeBlurred.png");
    const friendsFocused = require("assets/friendsFocused.png");
    const friendsBlurred = require("assets/friendsBlurred.png");
    const notifFocused = require("assets/notifFocused.png");
    const notifBlurred = require("assets/notifBlurred.png");

    const tabWidth = windowWidth / 3;
    const tabHeight = tabWidth / 2.25;

    useEffect(() => {
      if (typeof params !== 'undefined' && params.loggedIn !== 'undefined') {
        if (!fromLogin) {
          setFromLogin(true)
          setTimeout(() => {
            Alert.alert('Logged In!');
          }, 10)
        }
      }
    }, [isFocused])

    
    return (
        <>
            {/* <View style={styles.background}>
                <Background page={routename}/>
            </View> */}
            <Tab.Navigator
                sceneContainerStyle={styles.tabScreen}
                style={styles.tabNav}
                tabBarPosition="bottom"
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let icon;
                      if (route.name === 'Home') {
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
                        alignItems: 'center'
                    }
                  }}
                  beforeRemove={() => console.log('remove')}>
                <Tab.Screen name="Friends" component={FriendsPage}/>
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Notifications" component={NotificationPage} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
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