import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  PickerIOSItem,
  LayoutAnimation,
  Image,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// APIs
import { ReadAPI } from "../../API";
// Contexts
import { DimensionContext } from "contexts/DimensionContext";
import { UserContext } from "contexts/UserContext";
// Custom Components
import NotificationCard from "components/NotificationCard";
import Header from "components/Header";
// Images/Assets
import AppStyles from "../../AppStyles";





/*------- testing --------*/

// temorary test data to simulate backend notification data
const pic = require("assets/profilePic.jpg");
const gradient = require("assets/gradients/right.png");

// function buildTestHugData(
//   hugId,
//   completed,
//   dateTime,
//   img,
//   receiverDescription,
//   receiverId,
//   senderDescription,
//   senderId
// ) {
//   return {
//     hugId: hugId,
//     completed: completed,
//     dateTime: dateTime,
//     images: img,
//     receiverDescription: receiverDescription,
//     receiverId: receiverId,
//     senderDescription: senderDescription,
//     senderId: senderId,
//   };
// }

// const testDes1 =
//   "are you ready kids, aye aye captain, i cant hear you, aye aye captin";
// const testDes2 =
// "ohhhhhhhhhhhhhhhhh who lives in a pineapple under the sea spongebb squarepants";


// const testData = [
//   buildTestData("Alex Chow", "April 20, 2020", img, "hug", '1', '1'),
//   buildTestData("Evan Chow", "April 20, 2020", img, "friend", '2', '2'),
//   buildTestData("Alex Suong", "April 20, 2020", img, "hug", '3', '3'),
//   buildTestData("Alex Evan", "April 20, 2020", img, "hug", '4', '4'),
//   buildTestData("Alex Chow", "April 20, 2020", img, "hug", '5', '5'),
//   buildTestData("Suong Chow", "April 20, 2020", img, "friend", '6', '6'),
//   buildTestData("Alex Chow", "April 20, 2020", img, "friend", '7', '7'),
//   buildTestData("Alex Song", "April 20, 2020", img, "hug", '8', '8'),
//   buildTestData("Evan Alex", "April 20, 2020", img, "hug", '9', '9'),
// ];

// const testHugData = [
//   buildTestHugData(1, true, "April 20, 2020", img, testDes1, "@Evan", testDes2, "@Alex",),
//   buildTestHugData(3, true, "April 22, 2020", img, testDes1, "@Alex", testDes2, "@Tyus",),
//   buildTestHugData(5, true, "April 22, 2020", img, testDes1, "@Vicki", testDes2, "@AlexChow",),
//   buildTestHugData(6, true, "April 22, 2020", img, testDes1, "@Vivian", testDes2, "@TyusLiu",),
//   buildTestHugData(7, true, "April 22, 2020", img, testDes1, "@Alana", testDes2, "@VickiChen",),
// ];
//  // ( only if type is hug) notification_id: notif_id}]}

// function buildTestData(name, date_time, friendpfp, type, call_id, notification_id) {
//     return {
//         name: name, 
//         date_time: date_time,
//         friendpfp: friendpfp,
//         type: type,
//         call_id: call_id,
//         notification_id: notification_id,
//     }
// }

/*------- end of testing --------*/






export default function NotificationPage({ navigation, route }) {
    // States
    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false)
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const [notifications, setNotifications] = useState()
    const { userData } = useContext(UserContext);
    // Misc
    const { uid } = userData.currentUser;
    const routeName = route.name;
    
    // check whether the user is on the page (true) or navigates away from the page (false)
    useFocusEffect(() => {
        setIsFocused(true)
        return () => {
           setIsFocused(false)
        }
    }, []);  

    function getNotifications() {
        ReadAPI.getNotifications(uid)
            .then(response => {
                console.log(response.data.notifications.notifs)
                setNotifications(response.data.notifications.notifs)
            })
    }

    // add a filler item to move the list down
    useEffect(() => {
        getNotifications();
    }, []);

    function catchHug(hugId, id) {
        //console.log(id)
        let data = notifications.filter((item) => item.callback_id === hugId)[0]
        clearNotification(id)

        // data = Object.assign({}, {hug_id: data.call_id, ...data})
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
        let friend = notifications.filter((item) => item.callback_id === friendId)[0]
        clearNotification(id)
        let data = { 
            status: friend.type, 
            profile_pic: friend.friendPfp,
            name: friend.friendName,
            username: friend.friend_username,
            otheruser_id: friend.callback_id,
        }
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
                <Button title="adsfasdfdf" onPress={getNotifications}/>
                {/* actual list */}
                
                {notifications && <ScrollView scrollProps={{ showsVerticalScrollIndicator: false }}>
                    {notifications && notifications.map(( data, index ) => (
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
                </ScrollView>}
            </View>                   
        </View>
    )
} 
