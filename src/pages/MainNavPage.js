import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'

import HomePage from './HomePage'
import NotificationPage from './NotificationPage'
import UserProfilePage from './UserProfilePage'

import AppStyles from '../AppStyles'

export default function MainNavPage({ history, location }) {
 
    return (
        <View>
            <Swiper showsPagination={false} loop={false} index={location.state}>
                <View style={AppStyles.container}>
                    <UserProfilePage history={history}/>
                </View>
                <View style={AppStyles.container}>
                    <HomePage history={history}/>
                </View>
                <View style={AppStyles.container}>
                    <NotificationPage history={history}/>
                </View>
            </Swiper>
        </View>
    )
}

