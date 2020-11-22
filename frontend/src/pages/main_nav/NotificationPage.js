import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, PickerIOSItem, LayoutAnimation } from 'react-native';
import NotificationPanel from 'components/NotificationPanel';
import { DimensionContext } from '../../contexts/DimensionContext'

import { useFocusEffect } from '@react-navigation/native';

// temorary test data to simulate backend notification data 
const pic = require('../../../assets/profilePic.jpg')
   
function buildTestData(type, msg, img, id) {
    return {
        type: type,
        message: msg,
        image: img,
        id: id
    }
}



const testData = [
    buildTestData('request', 'Alex Chow', require('../../../assets/profilePic.jpg'), 0),
    buildTestData('hug', 'Evan Suong', require('../../../assets/profilePic.jpg'), 1),
    buildTestData('hug', 'Yixuan Zhou', require('../../../assets/profilePic.jpg'), 2),
    buildTestData('request', 'Tyus Liu', require('../../../assets/profilePic.jpg'), 3),
    buildTestData('request', 'Vicki Chen', require('../../../assets/profilePic.jpg'), 4),
]

export default function NotificationPage({ navigation }) {

    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false)

    const [notifications, setNotifications] = useState(testData ? testData : {})

    const { dimensions } = useContext(DimensionContext)

    useEffect(() => {
            console.log('notifs: ', dimensions)
    }, [dimensions])

    // check whether the user is on the page (true) or navigates away from the page (false)
    useFocusEffect(() => {
        setIsFocused(true)
        return () => {
           setIsFocused(false)
        }
    }, []);  

    function clearNotification(id) {
        const newList = notifications.filter((item) => item.id !== id);
        setNotifications(() => {
            return newList
        }, () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        });
    }
    
    // map every notification entry to a notification panel element 
    return (
        <View style={styles.notificationList}>
            <ScrollView scrollProps={{ showsVerticalScrollIndicator: false }}>
                {notifications.map((data, index) => (
                    <NotificationPanel key={index} index={index} notificationData={data} isFocused={isFocused} clearNotification={clearNotification} />
                ))}
            </ScrollView>
        </View>
    )
} 

// notification list styles
const styles = StyleSheet.create({
    notificationList: {
        marginHorizontal: 5,
    }
})