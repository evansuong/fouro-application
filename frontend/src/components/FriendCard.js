/**
 * Author: Rickesh Khilnani, Alex Chow 
 * 
 * References:
 * https://stackoverflow.com/questions/40665370/react-native-what-is-a-proper-way-to-pass-style-as-props-when-using-spread-ope
 * https://stackoverflow.com/questions/53647304/elevation-in-react-native 
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
 * @param {string} friendColorString    The color for the card as a HEX string 
 *                                      (e.g., '#FE5951') indicating how much
 *                                      the user has interacted with this friend recently
 * 
 * @param {string} key                  An identifier for the friend
 */
export default function FriendCard({ profilePicture, friendName, friendColorString}) {

  const friendColor = { backgroundColor: friendColorString }
  //

  return (
    <View style={styles.container}>
      <View style={[styles.friendCardContainer, friendColor]}>
        <View style={styles.tinyProfilePic}>
          <Image
            source={{ uri: profilePicture }}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4
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
