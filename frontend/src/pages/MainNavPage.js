import React from 'react'
import HomePage from './HomePage'
import NotificationPage from './NotificationPage'
import UserProfilePage from './UserProfilePage'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function MainNavPage() {

    const Tab = createMaterialTopTabNavigator()
 
    return (
        <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
            <Tab.Screen name="Profile" component={UserProfilePage} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Notification" component={NotificationPage} />
        </Tab.Navigator>
    )
}

