import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppStyles from '../AppStyles';


export default function UserProfile({ profilePicture, userFirstLast, username }) {
  const userFirstLastDummy = userFirstLast
  const usernameDummy = username  
  
  return (
    <View> 
        <View style={styles.container}>
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
    marginTop: 20, // added this
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicStyle: {
    justifyContent: 'center',
    borderRadius: 100,
    width: "30%", // TODO: change to responsive design
    height: "50%", // TODO: change to responsive design
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