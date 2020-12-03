import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'

// TODO: Haven't tested undefined hugImage

export default function HugCard({ navigation, name, hugText, hugImage, hugId, mode='light' }) {

  const {windowWidth, windowHeight} = useContext(DimensionContext)

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
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20,
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
      backgroundColor: 'red',
    },
    nameBar: {
      display: 'flex',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopLeftRadius: 20,
      paddingLeft: 5,
      width: hugCardWidth - hugImageWidth,
    },
    nameBarNoImg: {
      display: 'flex',
      // backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
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
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0)' : 'white',
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
        borderBottomLeftRadius: 20,
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
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
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
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: hugImageWidth, 
        height: hugImageHeight,
    },
    name: {
        marginTop: 7,
        marginLeft: 7,
        marginBottom: 5,
        fontSize: 17,
        fontWeight: 'bold',
        color: mode == 'dark' ? 'white' : 'black',
    },
    hugText: {
        fontSize: 15,
        color: mode == 'dark' ? 'white' : 'black',
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
      </TouchableOpacity>
  )
}
