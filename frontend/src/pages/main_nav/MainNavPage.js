import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage'
import HomePage from './HomePage'


export default function MainNavPage() {

    const Tab = createMaterialTopTabNavigator()
 
    return (
        <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
            <Tab.Screen name="Profile" component={FriendsPage} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Notification" component={NotificationPage} />
        </Tab.Navigator>
    )
}

