/**
 * Author: Rickesh Khilnani, Alex Chow 
 * 
 * References:
 * https://stackoverflow.com/questions/40665370/react-native-what-is-a-proper-way-to-pass-style-as-props-when-using-spread-ope
 * https://stackoverflow.com/questions/53647304/elevation-in-react-native 
 */

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { DimensionContext } from '../contexts/DimensionContext'
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
export default function FriendCard(props) {

  const { profilePicture, friendName, friendColorString, navigation, height, width} = props;
  const { windowWidth, windowHeight } = useContext(DimensionContext)
  const pfpWidth = windowWidth * 0.12
  const cardHeight = pfpWidth + 10
  const friendColor = { backgroundColor: friendColorString }
  const containerDimensions = { width: width, height: height }

  const styles = StyleSheet.create({
    pfpContainer: {
      marginLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      width: pfpWidth + 5,
      height: pfpWidth + 5,
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
      display: 'flex',
      height: cardHeight,
      width: width,
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
      width: pfpWidth,
      height: pfpWidth,
      borderRadius: 100,
    },
    friendText: {
      fontSize: 20,
      marginLeft: 20,
      color: 'white',
    }
  });

  return (
    /* the card itself */
    <TouchableOpacity 
      style={[styles.friendCardContainer, friendColor]}
      onPress={() => { navigation.navigate("Friend Profile", { page: "friendProfile", data: props }) }}
    >

    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: pfpWidth + 10 }}>

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