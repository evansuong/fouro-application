/**
 * 
 * References:
 * https://reactnavigation.org/docs/stack-navigator/#headershown
 */

import React, { useContext } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'
import { DimensionContext } from '../../contexts/DimensionContext';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import Background from '../../components/Background';
import customHeader from '../../components/Header';



// TODO: follow the gradient thing
export default function MainNavPage() {

    const Tab = createMaterialTopTabNavigator()
    
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const route = useRoute();
    const routename =  getFocusedRouteNameFromRoute(route);

    const homeFocused = require("assets/homeFocused.png")
    const homeBlurred = require("assets/homeBlurred.png")
    const friendsFocused = require("assets/friendsFocused.png")
    const friendsBlurred = require("assets/friendsBlurred.png")
    const notifFocused = require("assets/notifFocused.png")
    const notifBlurred = require("assets/notifBlurred.png")

    const tabWidth = windowWidth / 3
    const tabHeight = tabWidth / 2.25
    
    return (
        <>
            <View style={styles.background}>
                <Background page={routename}/>
            </View>
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
                      } else if (route.name === 'Notification') {
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
                <Tab.Screen name="Friends" component={FriendsPage} {...customHeader(true, 'Friends')} />
                <Tab.Screen name="Home" component={HomePage} {...customHeader(true, 'Home')} />
                <Tab.Screen name="Notifications" component={NotificationPage} {...customHeader(true, 'Notifications')} />
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
    mainNavContainer: {
    }
    // linearGradient: {
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     height: windowHeight,
    // },
})