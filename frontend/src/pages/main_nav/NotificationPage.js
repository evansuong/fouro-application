import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, PickerIOSItem } from 'react-native';
import NotificationPanel from '../../components/NotificationPanel';





export default function NotificationPage({ navigation }) {

    // const [notifications, setNotifications] = useState(testData)
    const pic = require('../../../assets/profilePic.jpg')

    const testData = [
        buildTestData('request', 'yixuaiend request', require('../../../assets/profilePic.jpg')),
        buildTestData('hug', 'yixuas sent you a hug', require('../../../assets/profilePic.jpg')),
        buildTestData('hug', 'yixuas sent you a hug', require('../../../assets/profilePic.jpg')),
        buildTestData('request', 'yixuan has sent you a friend request', require('../../../assets/profilePic.jpg')),
        buildTestData('request', 'yixuan has sent you a friend request', require('../../../assets/profilePic.jpg')),
    ]

    
    function buildTestData(type, msg, img) {
        return {
            type: type,
            message: msg,
            image: img,
        }
    }


    const scrollProps = {
        showsVerticalScrollIndicator: false,

    }

    return (
        <View style={styles.notificationList}>
            <ScrollView {...scrollProps}>
                {testData.map(data => (
                    <NotificationPanel notificationData={data} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    notificationList: {
        margin: 5,
    }
})