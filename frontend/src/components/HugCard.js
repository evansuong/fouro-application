import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'

// TODO: Haven't tested undefined hugImage

export default function HugCard({ navigation, name, hugText, hugImage, hugId, mode='light' }) {

  const {windowWidth, windowHeight} = useContext(DimensionContext)

  const hugCardWidth = windowWidth - 20;
  const hugCardHeight = windowHeight / 5.5;
  const hugDescMaxHeight = hugCardHeight / 1.5;
  const hugImageWidth = hugImage ? hugCardWidth / 2.5 : 0;
  const hugImageHeight = hugCardHeight;
  const hugDescWidth = hugCardWidth - hugImageWidth - 30;/// 1.5; //hugCardWidth - hugImageWidth
  const pinHeight = hugCardWidth / 13;
  
  const pinPress = () => {
    console.log('pinning hug');
    // Navigate to corkboard
    navigation.navigate('Corkboard')
    // and add hug to the corkboard
  }

  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1, 
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20,
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      backgroundColor: 'red',
    },
    nameBar: {
      display: 'flex',
      backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopLeftRadius: 20,
      paddingLeft: 5,
      width: hugCardWidth - hugImageWidth,
    },
    nameBarNoImg: {
      display: 'flex',
      backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingLeft: 5,
      width: hugCardWidth - hugImageWidth,
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
        shadowRadius: 20,
        elevation: 7,
        borderRadius: 20,
        backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0)' : 'white',
        marginBottom: 5,
        marginTop: 5,
        width: hugCardWidth, 
        height: hugCardHeight,
    },
    textBodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
        // backgroundColor: 'yellow',
        height: hugCardHeight - 40,
        width: hugCardWidth - hugImageWidth,
        flexDirection: 'row',
        borderBottomLeftRadius: 20,
    },
    textBodyContainerNoImg: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      // backgroundColor: 'yellow',
      height: hugCardHeight - 40,
      width: hugCardWidth - hugImageWidth,
      flexDirection: 'row',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    textContainer: {
      marginLeft: 15,
      width: hugDescWidth,
      overflow: 'hidden',
      maxHeight: hugDescMaxHeight,
      // backgroundColor: 'blue',
    },
    pinIcon: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    imageContainer: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: hugImageWidth, 
        height: hugImageHeight,
    },
    name: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 20,
        color: mode == 'dark' ? 'white' : 'black',
    },
    hugText: {
        fontSize: 15,
        color: mode == 'dark' ? 'white' : 'black',
    },
  })
  
  return (
    /* container */
      <View style={styles.hugCardContainer}>

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
                <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                >
                  <Text style={styles.hugText}>
                      {hugText}
                  </Text>
                </ScrollView>
              </View>
            </View>
          }
          {
            !hugImage &&
            <View style={styles.textBodyContainerNoImg}>
              <View style={styles.textContainer}>
                <ScrollView 
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                >
                  <Text style={styles.hugText}>
                      {hugText}
                  </Text>
                </ScrollView>
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
      </View>
  )
}
