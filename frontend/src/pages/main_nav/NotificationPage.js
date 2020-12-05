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
import NotificationCard from "components/NotificationCard";
import { DimensionContext } from "../../contexts/DimensionContext";

import { useFocusEffect } from "@react-navigation/native";
import AppStyles from "../../AppStyles";
import Header from "../../components/Header";

// temorary test data to simulate backend notification data
const pic = require("../../../assets/profilePic.jpg");
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
    images: [img, img, img],
    receiverDescription: receiverDescription,
    receiverId: receiverId,
    senderDescription: senderDescription,
    senderId: senderId,
  };
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
    hugId: hug,
  };
}

const testDes1 =
  "are you ready kids, aye aye captain, i cant hear you, aye aye captin";
const testDes2 =
"ohhhhhhhhhhhhhhhhh who lives in a pineapple under the sea spongebb squarepants";

const image = require("../../../assets/profilePic.jpg")

const testData = [
  buildTestData(1, "h", "April 20, 2020", "@Alex", image, 1, 1),
  buildTestData(2, "r", "April 20, 2020", "@Alana", image, 2, 2),
  buildTestData(3, "h", "April 20, 2020", "@Tyus", image, 3, 3),
  buildTestData(4, "r", "April 20, 2020", "@Gary", image, 4, 4),
  buildTestData(5, "h", "April 20, 2020", "@AlexChow", image, 5, 5),
  buildTestData(6, "h", "April 20, 2020", "@TyusLiu", image, 6, 6),
  buildTestData(7, "h", "April 20, 2020", "@VickiChen", image, 7, 7),
];


const testHugData = [
  buildTestHugData(1, true, "April 20, 2020", image, testDes1, "@Evan", testDes2, "@Alex",),
  buildTestHugData(3, true, "April 22, 2020", image, testDes1, "@Alex", testDes2, "@Tyus",),
  buildTestHugData(5, true, "April 22, 2020", image, testDes1, "@Vicki", testDes2, "@AlexChow",),
  buildTestHugData(6, true, "April 22, 2020", image, testDes1, "@Vivian", testDes2, "@TyusLiu",),
  buildTestHugData(7, true, "April 22, 2020", image, testDes1, "@Alana", testDes2, "@VickiChen",),
];

export default function NotificationPage({ navigation, route }) {
  // stores whether the user is on this page (true) or not (false)
  const [isFocused, setIsFocused] = useState(false);
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const [notifications, setNotifications] = useState(testData ? testData : {});
  const routeName = route.name;

  // check whether the user is on the page (true) or navigates away from the page (false)
  useFocusEffect(() => {
    setIsFocused(true);
    return () => {
      setIsFocused(false);
    };
  }, []);

  // add a filler item to move the list down
  useEffect(() => {
    if (notifications[0].type !== "f")
      setNotifications([{ type: "f" }, ...notifications]);
  }, []);

  function catchHug(hugId, id) {
    clearNotification(id);
    console.log(id);

    navigation.navigate("Hug Info", {
      page: "hugInfo",
      data: testHugData.filter((item) => item.hugId === hugId)[0],
    });
    // signify hug as caught to the database
  }

  function dropHug(hugId, id) {
    clearNotification(id);
    // remove hug from database
  }

  function acceptFriendRequest(friendId, id) {
    clearNotification(id);
    navigation.navigate("Friend Profile", {
      page: "friendProfile",
      data: notifications.filter((item) => item.friendId === id)[0],
    });
    // add friend to user friend list in database
  }

  function declineFriendRequest(friendId, id) {
    clearNotification(id);
    // remove friend reauest fron database
  }

  function clearNotification(id, type) {
    const newList = notifications.filter((item) => item.id !== id);
    setNotifications(newList);
  }

  // notification list styles
  const styles = StyleSheet.create({
    notificationList: {
      marginHorizontal: 5,
      display: "flex",
      flexShrink: 1,
      alignItems: "center",
    },
    filler: {
      height: windowHeight / 7,
    },
  });

  // map every notification entry to a notification panel element
  return (
    <View style={AppStyles.navPageContainer}>
      {/* background */}
      <Image source={gradient} style={AppStyles.background} />
      <Header routeName={routeName} navigation={navigation} onMainNav={true}>
        Notifications
      </Header>

      <View style={styles.notificationList}>
        {/* actual list */}
        <ScrollView scrollProps={{ showsVerticalScrollIndicator: false }}>
          {notifications.map((data, index) =>
            data.type === "r" ? (
              <NotificationCard
                key={data.id}
                callId={data.friendId}
                notificationData={data}
                isFocused={isFocused}
                handleAccept={acceptFriendRequest}
                handleDecline={declineFriendRequest}
              />
            ) : data.type === "f" ? (
              <View key={"filler"} style={styles.filler}></View>
            ) : (
              <NotificationCard
                key={data.id}
                callId={data.hugId}
                notificationData={data}
                isFocused={isFocused}
                handleAccept={catchHug}
                handleDecline={dropHug}
              />
            )
          )}
        </ScrollView>
      </View>
    </View>
  );
}
