import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import AppStyles from '../AppStyles';
import { DimensionContext } from '../contexts/DimensionContext'

export default function UserProfile({ profilePicture, userFirstLast, username }) {
  const userFirstLastDummy = userFirstLast
  const usernameDummy = username
  const {windowWidth, windowHeight} = useContext(DimensionContext)

  return (
    <View> 
        <View style={[styles.container, {width: windowWidth}]}>
            <Image
                source={profilePicture}
                style={styles.profilePicStyle}
            />
            <Text style={styles.userFirstLastStyle}>
                {userFirstLastDummy}</Text>
            <Text style={styles.usernameStyle}>
                @{usernameDummy}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40, // added this
    overflow: 'hidden',
    alignItems: 'center',
    zIndex: -1,
    backgroundColor: 'transparent'
  },
  profilePicStyle: {
    justifyContent: 'center',
    borderRadius: 100,
    width: 100, // TODO: change to responsive design
    height: 100, // TODO: change to responsive design
    // use the line below to test dimensions
    backgroundColor: 'blue',
    resizeMode: 'contain'
  },
  userFirstLastStyle: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  usernameStyle: {
      fontSize: 18
  }
});