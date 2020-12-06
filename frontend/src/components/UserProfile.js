import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';

/**
 * @param { Image } profilePicture    a resource called with require('pathname')
 * 
 * @param { string } userFirstLast    the user's first and last name
 * 
 * @param { username } username       the user's username
 */
export default function UserProfile({ routeName, profilePicture, userFirstLast, username }) {

  const userFirstLastDummy = userFirstLast;
  const usernameDummy = username;
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;

  const userInfoHeight = 
    routeName === 'User Profile Page' ? hp('30%') : hp('20%');
  const profPicWidth = userInfoHeight * 0.6;
  const nameFontSize = userInfoHeight * 0.15; 
  const usernameFontSize = userInfoHeight * 0.09;
  const marginSize = userInfoHeight * 0.01;

  const styles = StyleSheet.create({
    container: {
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
      resizeMode: 'contain',
      width: profPicWidth, 
      height: profPicWidth
    },
    userFirstLastStyle: {
      color: isLightTheme ? 'black' : 'white',
      fontWeight: 'bold',
      fontSize: nameFontSize
    },
    usernameStyle: {
      fontSize: usernameFontSize,
      color: isLightTheme ? 'black' : '#EEE',
    }
  });

  return (
      <View style={[styles.container, { display: "flex" }]}>
          <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicStyle}
          />
          <Text style={styles.userFirstLastStyle}>
              {userFirstLastDummy}
          </Text>
          <Text style={styles.usernameStyle}>
              @{usernameDummy}
          </Text>
      </View>
  );
}