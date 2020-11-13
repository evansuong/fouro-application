import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import AppStyles from '../AppStyles';


export default function FriendListing({ profilePicture, friendName }) {
  return (
    <View style={styles.container}>
      <View style={AppStyles.friendListingContainer}>
        <View style={AppStyles.tinyProfilePic}>
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