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
import { UserContext } from '../contexts/UserContext';
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

  const { navigation, height, width, friendData, removeFriend } = props;
  const { color, name, profile_pic, username, user_id } = friendData;

  console.log(profile_pic)

  const { windowWidth, windowHeight } = useContext(DimensionContext)
  const pfpWidth = windowWidth * 0.11
  const cardHeight = pfpWidth + 15
  const friendColor = { backgroundColor: color }
  const containerDimensions = { width: width, height: height }
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;  

  const styles = StyleSheet.create({
    pfpContainer: {
      marginLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      width: pfpWidth + 5,
      height: pfpWidth + 5,
      backgroundColor: isLightTheme ? 'pink' : color,
    },
    pfpContainer2: {
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      width: 40,
      height: 40
    },
    friendCardContainer: {
      display: 'flex',
      height: cardHeight,
      width: width,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: isLightTheme ? color : 'rgb(40, 40, 40)',
  
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
      color: isLightTheme ? 'white' : color,
      fontWeight: '500',
    }
  });

  return (
    /* the card itself */
    <TouchableOpacity 
      style={styles.friendCardContainer}
      onPress={() => { navigation.navigate("Friend Profile", { data: friendData, removeFriend: removeFriend })}}
      activeOpacity={.9}
    >

    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: pfpWidth + 10 }}>

        {/* profile picture */}
        <View style={styles.pfpContainer}>
          <Image
            source={{ uri: profile_pic }}
            style={styles.pfp}
          />
        </View>

        {/* friend name */}
        <Text style={styles.friendText}>
          {name}
        </Text>

        {/* filler profile picture */}
        <View style={styles.pfpContainer2}>
        </View>

      </View>

    </TouchableOpacity>
  );
}