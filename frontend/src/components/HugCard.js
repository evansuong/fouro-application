import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'
import { UserContext } from '../contexts/UserContext';

// TODO: Haven't tested undefined hugImage

export default function HugCard({ navigation, name, hugText, hugImage, hugId }) {

  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;

  const hugCardWidth = windowWidth - 20;
  const hugCardHeight = 145 // windowHeight / 5.5;
  const hugImageWidth = hugImage ? hugCardWidth / 2.5 : 0;
  const hugImageHeight = hugCardHeight;
  const hugDescWidth = hugCardWidth - hugImageWidth - 30;/// 1.5; //hugCardWidth - hugImageWidth
  const nameFontSize = hugCardWidth * 0.05

  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1, 
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10,
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      backgroundColor: 'red',
    },
    nameBar: {
      display: 'flex',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopLeftRadius: 10,
      paddingLeft: 5,
      width: hugCardWidth - hugImageWidth,
      backgroundColor: isLightTheme ? '#d9d9d9' : 'rgb(33, 30, 31)'
    },
    nameBarNoImg: {
      display: 'flex',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingLeft: 5,
      width: hugCardWidth - hugImageWidth,
      backgroundColor: isLightTheme ? '#d9d9d9' : 'rgb(33, 30, 31)'
    },
    outerImageContainer: {
      // marginRight: 10,
      // marginTop: mode == 'light' ? hugCardHeight / 30 : hugCardHeight / 8,
      backgroundColor: 'pink', 
      height: hugCardHeight,
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
        marginBottom: 10,
        width: hugCardWidth, 
        height: hugCardHeight,
    },
    textBodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
        // backgroundColor: 'white',
        flexShrink: 1,
        marginBottom: 7,
        width: hugCardWidth - hugImageWidth,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        padding: 10,
    },
    textBodyContainerNoImg: {
      display: 'flex',
      justifyContent: 'space-between',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      // backgroundColor: 'yellow',
      // height: hugCardHeight - 40,
      flexShrink: 1,
      width: hugCardWidth - hugImageWidth,
      flexDirection: 'row',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 10,
    },
    textContainer: {
      marginLeft: 12,
      width: hugDescWidth,
      overflow: 'hidden',
      flexShrink: 1,
      // maxHeight: hugDescMaxHeight - 10,
      // backgroundColor: 'blue',
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
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: isLightTheme ? '#000' : '#EEE',
    },
    hugText: {
        fontSize: 15,
        color: isLightTheme ? '#000' : '#EEE',
    },
  })
  
  return (
    /* container */
      <TouchableOpacity 
        style={styles.hugCardContainer}
        onPress={() => { navigation.navigate("Hug Info") }}
      >

        <View className='title-description'>
          {/* Name Bar */}
          { 
            hugImage &&
            <View style={styles.nameBar}>
              <Text style={styles.name}>
                  {name}
              </Text>
            </View>
          }
          {
            !hugImage && 
            <View style={styles.nameBarNoImg}>
              <Text style={styles.name}>
                  {name}
              </Text>
            </View>
          }

          {
            hugImage &&
            <View style={styles.textBodyContainer}>
              <View style={styles.textContainer}>
                {/* <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                > */}
                  <Text style={styles.hugText}>
                      {hugText}
                  </Text>
                {/* </ScrollView> */}
              </View>
            </View>
          }
          {
            !hugImage &&
            <View style={styles.textBodyContainerNoImg}>
              <View style={styles.textContainer}>
                {/* <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                > */}
                  <Text style={styles.hugText}>
                      {hugText}
                  </Text>
                {/* </ScrollView> */}
              </View>
            </View>
          }
        </View>

        <View>
          <Image
            source={hugImage}
            style={styles.imageContainer}
          />  
        </View>
      </TouchableOpacity>
  )
}
