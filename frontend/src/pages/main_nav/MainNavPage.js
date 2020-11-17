import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'


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
            <Tab.Navigator sceneContainerStyle={styles.tabScreen} style={styles.tabNav} tabBarPosition="bottom" initialRouteName="Home">
                <Tab.Screen name="Profile" component={FriendsPage} />
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
        height: 700,
    },
})
