import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, PickerIOSItem, LayoutAnimation } from 'react-native';
import NotificationCard from 'components/NotificationCard';
import { DimensionContext } from '../../contexts/DimensionContext'

import { useFocusEffect } from '@react-navigation/native';

// temorary test data to simulate backend notification data 
const pic = require('../../../assets/profilePic.jpg')
   
function buildTestData(type, user, img, id) {
    return {
        type: type,
        user: user,
        image: img,
        id: id,
    }
}



const testData = [
    buildTestData('r', 'Alex Chow', require('../../../assets/profilePic.jpg'), 0),
    buildTestData('h', 'Evan Suong', require('../../../assets/profilePic.jpg'), 1),
    buildTestData('h', 'Yixuan Zhou', require('../../../assets/profilePic.jpg'), 2),
    buildTestData('r', 'Tyus Liu', require('../../../assets/profilePic.jpg'), 3),
    buildTestData('r', 'Vicki Chen', require('../../../assets/profilePic.jpg'), 4),
]

export default function NotificationPage({ navigation }) {

    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false)
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const [notifications, setNotifications] = useState(testData ? testData : {})
    

    // check whether the user is on the page (true) or navigates away from the page (false)
    useFocusEffect(() => {
        setIsFocused(true)
        return () => {
           setIsFocused(false)
        }
    }, []);  

    function catchHug(id) {
        clearNotification(id)
        navigation.navigate('Hug Info', { 
            page: 'Hug Info',
            data: notifications.filter((item) => item.id === id)[0], 
        })
        // signify hug as caught to the database
    }

    function dropHug(id) {
        clearNotification(id)
        // remove hug from database
    }

    function acceptFriendRequest(id) {
        clearNotification(id)
        // add friend to user friend list in database
    }

    function declineFriendRequest(id) {
        clearNotification(id)
        // remove friend reauest fron database
    }

    function clearNotification(id) {
        const newList = notifications.filter((item) => item.id !== id);
        setNotifications(newList)
    }

        
    // notification list styles
    const styles = StyleSheet.create({
        notificationList: {
            marginHorizontal: 5,
            display: 'flex',
            alignItems: 'center',
            minHeight: windowHeight - 20,
            marginTop: 70,
        }
    })
    
    // map every notification entry to a notification panel element 
    return (
        <View style={styles.notificationList}>
            <ScrollView scrollProps={{ showsVerticalScrollIndicator: false }}>
                {notifications.map((data, index) => (
                    data.type === 'request' ? 
                    <NotificationCard 
                        key={data.id} 
                        notificationData={data} 
                        isFocused={isFocused} 
                        handleAccept={acceptFriendRequest} 
                        handleDecline={declineFriendRequest} />
                        :
                    <NotificationCard 
                        key={data.id} 
                        notificationData={data} 
                        isFocused={isFocused} 
                        handleAccept={catchHug} 
                        handleDecline={dropHug} />
                ))}
            </ScrollView>
        </View>
    )
} 
