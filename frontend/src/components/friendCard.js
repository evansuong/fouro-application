import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import AppStyles from '../AppStyles';


export default function FriendCard({ profilePicture, friendName }) {
  return (
    <View style={styles.container}>
      <View style={styles.friendListingContainer}>
        <View style={styles.tinyProfilePic}>
          <Image
            source={profilePicture}
            style={styles.image}
          />
        </View>
        <Text style={styles.friendText}>
          {friendName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  tinyProfilePic: {
    marginLeft: 20,
    justifyContent: 'center',
    borderRadius: 100,
    width: '13%',
    height: '80%',
    backgroundColor: 'pink'
  },
  friendListingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'rgba(255,0,50,0.8)'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  friendText: {
    fontSize: 35,
    marginLeft: 30,
    color: 'white'
  }
});