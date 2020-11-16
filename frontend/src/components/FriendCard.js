/**
 * Author: Rickesh Khilnani, Alex Chow 
 * 
 * References:
 * https://stackoverflow.com/questions/40665370/react-native-what-is-a-proper-way-to-pass-style-as-props-when-using-spread-ope
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

/**
 * A single friend card to be used in the list of friends on the friends
 * page
 * @param {image} profilePicture        An image to be rendered as the friend's
 *                                      profile picture 
 * 
 * @param {string} friendName           The name to be rendered for the friend
 * 
 * @param {string} friendColorString    The color for the card as an rgba string 
 *                                      (e.g., 'rgba(255,0,50,0.8)') indicating how much
 *                                      the user has interacted with this friend recently
 */
export default function FriendCard({ profilePicture, friendName, friendColorString }) {

  const friendColor = { backgroundColor: friendColorString }

  return (
    <View style={styles.container}>
      <View style={[styles.friendCardContainer, friendColor]}>
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
    marginTop: 10,
  },
  tinyProfilePic: {
    marginLeft: 20,
    justifyContent: 'center',
    borderRadius: 100,
    width: '13%',
    height: '80%',
    backgroundColor: 'pink'
  },
  friendCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 325,
    height: 55,
    borderRadius: 100,
    elevation: 4,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  friendText: {
    fontSize: 20,
    marginLeft: 20,
    color: 'white'
  }
});
