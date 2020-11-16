import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NotificationPanel from '../../components/NotificationPanel';
import Background from 'components/Background';

function buildTestData(type, msg, img) {
    return {
        type: type,
        message: msg,
        image: img,
    }
}

const testData = [
    buildTestData('friend request', 'yixuan has sent you a friend request', 'image'),
    buildTestData('hug', 'yixuan has sent you a hug', 'imgae'),
    buildTestData('reminder', 'yixuan not had any hugs today, send him a hug', 'image'),
    buildTestData('reminder', 'yixuan not had any hugs today, send him a hug', 'image'),
    buildTestData('reminder', 'yixuan not had any hugs today, send him a hug', 'image'),
    buildTestData('friend request', 'yixuan has sent you a friend request', 'image'),
    buildTestData('friend request', 'yixuan has sent you a friend request', 'image'),
]

export default function NotificationPage({ navigation }) {

    const [notifications, setNotifications] = useState(testData)

    const scrollProps = {
        showsVerticalScrollIndicator: false,

    }

    return (
        <>
            <View style={styles.background}>
                <Background direction='right' />
            </View>
            <View style={styles.notificationList}>
                <ScrollView {...scrollProps}>
                    {notifications.map(data => (
                        <NotificationPanel notificationData={data} />
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    notificationList: {
        margin: 20,
    },
    background: {
        position: 'absolute',
        width: '100%'
    }
})