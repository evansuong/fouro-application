import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  PickerIOSItem,
  LayoutAnimation,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// Contexts
import { DimensionContext } from "contexts/DimensionContext";
// Custom Components
import NotificationCard from "components/NotificationCard";
import Header from "components/Header";
// Images/Assets
import AppStyles from "../../AppStyles";





/*------- testing --------*/

// temorary test data to simulate backend notification data
const pic = require("assets/profilePic.jpg");
const gradient = require("assets/gradients/right.png");

function buildTestHugData(
  hugId,
  completed,
  dateTime,
  img,
  receiverDescription,
  receiverId,
  senderDescription,
  senderId
) {
  return {
    hugId: hugId,
    completed: completed,
    dateTime: dateTime,
    images: img,
    receiverDescription: receiverDescription,
    receiverId: receiverId,
    senderDescription: senderDescription,
    senderId: senderId,
  };
}

const testDes1 =
  "are you ready kids, aye aye captain, i cant hear you, aye aye captin";
const testDes2 =
"ohhhhhhhhhhhhhhhhh who lives in a pineapple under the sea spongebb squarepants";

const img = 'https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb'

const testData = [
  buildTestData("Alex Chow", "April 20, 2020", img, "hug", '1', '1'),
  buildTestData("Evan Chow", "April 20, 2020", img, "friend", '2', '2'),
  buildTestData("Alex Suong", "April 20, 2020", img, "hug", '3', '3'),
  buildTestData("Alex Evan", "April 20, 2020", img, "hug", '4', '4'),
  buildTestData("Alex Chow", "April 20, 2020", img, "hug", '5', '5'),
  buildTestData("Suong Chow", "April 20, 2020", img, "friend", '6', '6'),
  buildTestData("Alex Chow", "April 20, 2020", img, "friend", '7', '7'),
  buildTestData("Alex Song", "April 20, 2020", img, "hug", '8', '8'),
  buildTestData("Evan Alex", "April 20, 2020", img, "hug", '9', '9'),
];


const testHugData = [
  buildTestHugData(1, true, "April 20, 2020", img, testDes1, "@Evan", testDes2, "@Alex",),
  buildTestHugData(3, true, "April 22, 2020", img, testDes1, "@Alex", testDes2, "@Tyus",),
  buildTestHugData(5, true, "April 22, 2020", img, testDes1, "@Vicki", testDes2, "@AlexChow",),
  buildTestHugData(6, true, "April 22, 2020", img, testDes1, "@Vivian", testDes2, "@TyusLiu",),
  buildTestHugData(7, true, "April 22, 2020", img, testDes1, "@Alana", testDes2, "@VickiChen",),
];
 // ( only if type is hug) notification_id: notif_id}]}

function buildTestData(name, date_time, friendpfp, type, call_id, notification_id) {
    return {
        name: name, 
        date_time: date_time,
        friendpfp: friendpfp,
        type: type,
        call_id: call_id,
        notification_id: notification_id,
    }
}

/*------- end of testing --------*/






export default function NotificationPage({ navigation, route }) {
    // States
    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false);
    const [notifications, setNotifications] = useState(testData ? testData : {});
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    // Misc
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
        // console.log(notifications)
        if (notifications[0].type !== 'f') setNotifications([{ type: 'f' }, ...notifications])
    }, []);

    function catchHug(hugId, id) {
        clearNotification(id)
        // console.log(id)
        let data = testHugData.filter((item) => item.hugId === hugId)[0]
        data = Object.assign({}, {hug_id: data.call_id, ...data})
        navigation.navigate('Catch Hug Page', { 
            page: 'hugInfo',
            data: data
        })
        // signify hug as caught to the database
    }

    function dropHug(hugId, id) {
        clearNotification(id)
        // remove hug from database
    }

    function acceptFriendRequest(friendId, id) {
        clearNotification(id)
        let data = notifications.filter((item) => item.call_id === id)[0]
        data = Object.assign({}, {profile_pic: data.friendpfp, ...data})
        navigation.navigate('Friend Profile', {
            page: 'friendProfile',
            data: data
        })
        // add friend to user friend list in database
    }

    function declineFriendRequest(friendId, id) {
        clearNotification(id)
        // remove friend reauest fron database
    } 

    function clearNotification(id, type) {
        const newList = notifications.filter((item) => item.call_id !== id);
        setTimeout(() => {
          setNotifications(newList);
        }, 1000);
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
                    {notifications.map(( data, index ) => (
                        data.type === 'friend' ? 
                        <NotificationCard 
                            key={data.notification_id} 
                            callId={data.friendId}
                            notificationData={data} 
                            isFocused={isFocused} 
                            handleAccept={acceptFriendRequest} 
                            handleDecline={declineFriendRequest} />
                            : data.type === 'f' ?
                        <View key={'filler'} style={styles.filler}></View>
                            :
                        <NotificationCard 
                            key={data.notification_id} 
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
