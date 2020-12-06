import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'
import { UserContext } from '../contexts/UserContext';

// TODO: Haven't tested undefined hugImage
// TODO: need severe refactoring -
//       1) reduce the amount of containers for hugText
//       2) merge no image and image hug cards' styles with flexShrink a const ? 1 : 0

export default function HugCard({ navigation, route, data }) {
  
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;

  // backend json object data fields
  const { 
    friend_name, 
    friend_username,
    friend_profile_pic, 
    message, 
    image, 
    hug_id,
  } = data;
  
  const SPACING_SMALL = 5
  const SPACING_MEDIUM = 10;
  const HUG_CARD_HEIGHT = 145

  const hugCardWidth = windowWidth - 20;
  const hugImageWidth = image ? hugCardWidth / 2.5 : 0;
  const hugImageHeight = HUG_CARD_HEIGHT;
  const hugDescWidth = hugCardWidth - hugImageWidth - 30;/// 1.5; //hugCardWidth - hugImageWidth
  const nameFontSize = hugCardWidth * 0.05

  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1, 
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10,
      backgroundColor: 'red',
    },
    nameBar: {
      display: 'flex',
      borderTopLeftRadius: 10,
      paddingLeft: SPACING_SMALL,
      width: hugCardWidth - hugImageWidth,
      backgroundColor: isLightTheme ? '#dddddd' : 'rgb(33, 30, 31)'
    },
    nameBarNoImg: {
      display: 'flex',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingLeft: SPACING_SMALL,
      width: hugCardWidth - hugImageWidth,
      backgroundColor: isLightTheme ? '#dddddd' : 'rgb(33, 30, 31)',
    },
    outerImageContainer: {
      // marginRight: 10,
      // marginTop: mode == 'light' ? HUG_CARD_HEIGHT / 30 : HUG_CARD_HEIGHT / 8,
      backgroundColor: 'pink', 
      height: HUG_CARD_HEIGHT,
    },
    pinContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    },
    hugCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: isLightTheme ? 'rgb(255, 255, 255)' : 'rgb(43, 40, 41)',
        marginBottom: SPACING_MEDIUM,
        width: hugCardWidth, 
        height: HUG_CARD_HEIGHT,
    },
    textBodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
        // backgroundColor: 'purple',
        flexShrink: 1,
        width: hugCardWidth - hugImageWidth,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        paddingLeft: SPACING_MEDIUM,
        paddingRight: SPACING_MEDIUM,
        paddingTop: SPACING_SMALL,
        paddingBottom: SPACING_SMALL
    },
    textBodyContainerNoImg: {
      display: 'flex',
      justifyContent: 'space-between',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      // backgroundColor: 'yellow',
      // height: HUG_CARD_HEIGHT - 40,
      // flexShrink: 1,
      width: hugCardWidth - hugImageWidth,
      flexDirection: 'row',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: SPACING_MEDIUM,
    },
    textContainer: {
      marginLeft: SPACING_SMALL,
      width: hugDescWidth,
      overflow: 'hidden',
      // flexShrink: 1,
      // maxHeight: hugDescMaxHeight - 10,
      // backgroundColor: 'yellow',
    },
    pinIcon: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    imageContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: hugImageWidth, 
        height: hugImageHeight,
    },
    name: {
        padding: 7,
        paddingHorizontal: SPACING_MEDIUM,
        fontSize: 17,
        fontWeight: 'bold',
        color: isLightTheme ? '#000' : '#eee',
    },
    hugText: {
        fontSize: 15,
        color: isLightTheme ? '#000' : '#EEE',
        fontFamily: 'Montserrat_400Regular',
    },
  });
  
  return (
    /* container */
      <TouchableOpacity 
        style={styles.hugCardContainer}
        onPress={() => { navigation.navigate("Hug Info", { data: data }) }}
        activeOpacity={.9}
      >
        <View className='title-description'>
          {/* Name Bar */}
          { 
            image &&
            <View style={styles.nameBar}>
              <Text style={styles.name}>
                  {friend_name}
              </Text>
            </View>
          }
          {
            !image && 
            <View style={styles.nameBarNoImg}>
              <Text style={styles.name}>
                  {friend_name}
              </Text>
            </View>
          }

          {
            image &&
            <View style={styles.textBodyContainer}>
              <View style={styles.textContainer}>
                {/* <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                > */}
                  <Text style={styles.hugText}>
                      {message}
                  </Text>
                {/* </ScrollView> */}
              </View>
            </View>
          }
          {
            !image &&
            <View style={styles.textBodyContainerNoImg}>
              <View style={styles.textContainer}>
                {/* <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                > */}
                  <Text style={styles.hugText}>
                      {message}
                  </Text>
                {/* </ScrollView> */}
              </View>
            </View>
          }
        </View>

        <View>
          <Image
            source={{ uri: image }}
            style={styles.imageContainer}
          />  
        </View>
      </TouchableOpacity>
  )
}
