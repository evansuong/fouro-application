/**
 * 
 * References:
 * https://reactnavigation.org/docs/stack-navigator/#headershown
 */

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'
import { DimensionContext } from '../../contexts/DimensionContext';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import Background from '../../components/Background';

// TODO: follow the gradient thing
export default function MainNavPage() {

    const Tab = createMaterialTopTabNavigator()
    const [backgroundState, setBackgroundState] = useState({ 
        start: [0.9, 0.1],
        end:[0.1, 0.7] 
    })
    
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const route = useRoute();
    const routename =  getFocusedRouteNameFromRoute(route);
        
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
            height: windowHeight,
        },
    })

    
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
                  }}
                  beforeRemove={() => console.log('remove')}>
                <Tab.Screen name="Friends" component={FriendsPage} />
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Notification" component={NotificationPage} />
            </Tab.Navigator>
        </>
    )
}
