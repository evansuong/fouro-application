import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, PickerIOSItem, LayoutAnimation, Image } from 'react-native';
import NotificationCard from 'components/NotificationCard';
import { DimensionContext } from '../../contexts/DimensionContext'

import { useFocusEffect } from '@react-navigation/native';
import AppStyles from '../../AppStyles';
import Header from '../../components/Header';

// temorary test data to simulate backend notification data 
const pic = require('../../../assets/profilePic.jpg')
const gradient = require('assets/gradients/right.png')
   
function buildTestHugData(hugId, time, completed, usr, des1, des2, img) {
    return {
        hugId: hugId,
        time: time,
        completed: true,
        senderId: usr,
        descriptionSender: des1,
        descriptionReceiver: des2,
        images: [img, img, img],
    }
}

 
function buildTestData(id, type, time, friend, img, friendId, hug) {
    return {
        id: id, 
        type: type,
        time: time,
        friend: {
            name: friend,
            profPic: img,
        },
        friendId: friendId,
        hugId: hug
    }
}


const testDes1 = 'are you ready kids, aye aye captain, i cant year you, aye aye captin';
const testDes2 = 'ohhhhhhhhhhhhhhhhh who lives in a pineapple under the sea spongebb squarepants';

const testData = [
    buildTestData(1, 'h', 'April 20, 2020', '@Alex', require('../../../assets/profilePic.jpg'), 1, 1),
    buildTestData(2, 'r', 'April 20, 2020', '@Alana', require('../../../assets/profilePic.jpg'), 2, 2),
    buildTestData(3, 'h', 'April 20, 2020', '@Tyus', require('../../../assets/profilePic.jpg'), 3, 3),
    buildTestData(4, 'r', 'April 20, 2020', '@Gary', require('../../../assets/profilePic.jpg'), 4, 4),
    buildTestData(5, 'h', 'April 20, 2020', '@AlexChow', require('../../../assets/profilePic.jpg'), 5, 5),
    buildTestData(6, 'h', 'April 20, 2020', '@TyusLiu', require('../../../assets/profilePic.jpg'), 6, 6),
    buildTestData(7, 'h', 'April 20, 2020', '@VickiChen', require('../../../assets/profilePic.jpg'), 7, 7),
]


const testHugData = [
    buildTestHugData(1, 'April 20, 2020', true, '@Alex', testDes1, testDes1, require('../../../assets/profilePic.jpg')),
    buildTestHugData(3, 'April 20, 2020', true, '@Tyus', testDes2, testDes2, require('../../../assets/profilePic.jpg')),
    buildTestHugData(5, 'April 20, 2020', true, '@AlexChow', testDes2, testDes1, require('../../../assets/profilePic.jpg')),
    buildTestHugData(6, 'April 20, 2020', true, '@TyusLiu', testDes1, testDes1, require('../../../assets/profilePic.jpg')),
    buildTestHugData(7, 'April 20, 2020', true, '@VickiChen', testDes1, testDes2, require('../../../assets/profilePic.jpg')),
]

export default function NotificationPage({ navigation, route }) {
 
    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false)
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const [notifications, setNotifications] = useState(testData ? testData : {})
    const routeName = route.name;
    

    // check whether the user is on the page (true) or navigates away from the page (false)
    useFocusEffect(() => {
        setIsFocused(true)
        return () => {
           setIsFocused(false)
        }
    }, []);  


    // add a filler item to move the list down
    useEffect(() => {
        if (notifications[0].type !== 'f') setNotifications([{ type: 'f' }, ...notifications])
    }, [])


    function catchHug(hugId, id) {
        clearNotification(id)
        console.log(id)

        navigation.navigate('Catch Hug Page', { 
            page: 'hugInfo',
            data: testHugData.filter((item) => item.hugId === hugId)[0], 
        })
        // signify hug as caught to the database
    }

    function dropHug(hugId, id) {
        clearNotification(id)
        // remove hug from database
    }

    function acceptFriendRequest(friendId, id) {
        clearNotification(id)
        navigation.navigate('Friend Profile', {
            page: 'friendProfile',
            data: notifications.filter((item) => item.friendId === id)[0],
        })
        // add friend to user friend list in database
    }

    function declineFriendRequest(friendId, id) {
        clearNotification(id)
        // remove friend reauest fron database
    }

    function clearNotification(id, type) {
        const newList = notifications.filter((item) => item.id !== id);
        setNotifications(newList)
    }


    // notification list styles
    const styles = StyleSheet.create({
        notificationList: {
            marginHorizontal: 5,
            display: 'flex',
            flexShrink: 1,
            alignItems: 'center',
        },
        filler: {
            height: windowHeight / 7,
        }
    })


        
   
    // map every notification entry to a notification panel element 
    return (
        <View style={AppStyles.navPageContainer}>
            {/* background */}
            <Image
                source={gradient}
                style={AppStyles.background}
            />
            <Header routeName={routeName} navigation={navigation} onMainNav={true}>Notifications</Header>

            <View style={styles.notificationList}>
                {/* actual list */}
                <ScrollView scrollProps={{ showsVerticalScrollIndicator: false }}>
                    {notifications.map((data, index) => (
                        data.type === 'r' ? 
                        <NotificationCard 
                            key={data.id} 
                            callId={data.friendId}
                            notificationData={data} 
                            isFocused={isFocused} 
                            handleAccept={acceptFriendRequest} 
                            handleDecline={declineFriendRequest} />
                            : data.type === 'f' ?
                        <View key={'filler'} style={styles.filler}></View>
                            :
                        <NotificationCard 
                            key={data.id} 
                            callId={data.hugId}
                            notificationData={data} 
                            isFocused={isFocused} 
                            handleAccept={catchHug} 
                            handleDecline={dropHug} />
                    ))}
                </ScrollView>
            </View>                   
        </View>
    )
} 
