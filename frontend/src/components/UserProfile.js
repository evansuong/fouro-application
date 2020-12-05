import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import AppStyles from '../AppStyles';
import { DimensionContext } from '../contexts/DimensionContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

/**
 * @param { Image } profilePicture    a resource called with require('pathname')
 * 
 * @param { string } userFirstLast    the user's first and last name
 * 
 * @param { username } username       the user's username
 */
export default function UserProfile({ routeName, profilePicture, userFirstLast, username }) {
  const userFirstLastDummy = userFirstLast
  const usernameDummy = username
  const {windowWidth, windowHeight} = useContext(DimensionContext)

  // const routeName = getFocusedRouteNameFromRoute(route)
  const userInfoHeight = routeName === 'User Profile Page' ? hp('30%') : hp('20%')
  // console.log("route name is" + routeName)
  const profPicWidth = userInfoHeight * 0.6
  const nameFontSize = userInfoHeight * 0.15 //0.15 before
  const usernameFontSize = userInfoHeight * 0.09
  const marginSize = userInfoHeight * 0.01

  return (
      <View style={[styles.container, { display: "flex" }]}>
          <Image
              source={profilePicture}
              style={[styles.profilePicStyle, { width: profPicWidth, height: profPicWidth }]}
          />
          <Text style={[styles.userFirstLastStyle, { fontSize: nameFontSize }]}>
              {userFirstLastDummy}</Text>
          <Text style={[styles.usernameStyle, { fontSize: usernameFontSize }]}>
              @{usernameDummy}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 40, // added this
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    paddingTop: 5,
    paddingBottom: 5
  },
  profilePicStyle: {
    justifyContent: 'center',
    borderRadius: 100,
    // use the line below to test dimensions
    // backgroundColor: 'blue',
    resizeMode: 'contain'
  },
  userFirstLastStyle: {
    fontWeight: 'bold'
  },
  usernameStyle: {
      //backgroundColor: 'blue'
  }
});