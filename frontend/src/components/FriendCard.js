/**
 * Author: Rickesh Khilnani, Alex Chow 
 * 
 * References:
 * https://stackoverflow.com/questions/40665370/react-native-what-is-a-proper-way-to-pass-style-as-props-when-using-spread-ope
 * https://stackoverflow.com/questions/53647304/elevation-in-react-native 
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

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
 * @param {string} navigation           The navigation prop for React Native navigation
 */
export default function FriendCard({ profilePicture, friendName, 
  friendColorString, navigation, height, width}) {

  const friendColor = { backgroundColor: friendColorString }
  const containerDimensions = { width: width, height: height }

  return (
    /* the card itself */
    <TouchableOpacity 
      style={[styles.friendCardContainer, friendColor, containerDimensions]}
      onPress={() => { navigation.navigate("Friend Profile") }}
    >

    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* profile picture */}
        <View style={styles.pfpContainer}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.pfp}
          />
        </View>

        {/* friend name */}
        <Text style={styles.friendText}>
          {friendName}
        </Text>

        {/* profile picture */}
        <View style={styles.pfpContainer2}>
        </View>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pfpContainer: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 45,
    height: 45,
    backgroundColor: 'pink'
  },
  pfpContainer2: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 45,
    height: 45
  },
  friendCardContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,

    /* iOS shadow*/
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    /* Android shadow */
    elevation: 4
  },
  pfp: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  friendText: {
    fontSize: 20,
    marginLeft: 20,
    color: 'white',
  }
});
