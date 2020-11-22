/**
 * 
 * References:
 * https://reactnavigation.org/docs/stack-navigator/#headershown
 */

import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'

const window = Dimensions.get('window');
const screenHeight = window.height
const screenWidth = window.width

export default function MainNavPage() {

    const Tab = createMaterialTopTabNavigator()
 
    return (
        <>
            <View style={styles.background}>
                <LinearGradient
                    colors={['#FFC24A','#FB7250']}
                    start={[0.9, 0.1]}
                    end={[0.1, 0.7]}
                    style={styles.linearGradient}
                />
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
                        icon = focused
                          ? require("../../../assets/homeFocused.png")
                          : require("../../../assets/homeBlurred.png");
                      } else if (route.name === 'Friends') {
                        icon = focused ? require('../../../assets/friendsFocused.png') : require('../../../assets/friendsBlurred.png');
                      } else if (route.name === 'Notification') {
                        icon = focused ? require('../../../assets/notifFocused.png') : require('../../../assets/notifBlurred.png');
                      }

                      return <Image source={icon} resizeMode='stretch' style={{ width: 120, height: 55, margin: 0, padding: 0 }} />
                    },
                  })}
                  tabBarOptions={{
                    showIcon: true,
                    showLabel: false,
                    iconStyle: {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                  }}>
                <Tab.Screen name="Friends" component={FriendsPage} />
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Notification" component={NotificationPage} />
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
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: screenHeight,
    },
})
