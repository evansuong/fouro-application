/**
 * Authors:
 *      Evan:       overall card container
 *      Rickesh:    hug image
 *      Vicki:      friend name
 *      Vivian:     hug description
 *      Alex:       pin button
 * */

import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'

export default function HugCard({ navigation, name, hugText, hugImage, hugId, mode='light' }) {

  const {windowWidth, windowHeight} = useContext(DimensionContext)

  const hugCardWidth = windowWidth - 20;
  const hugCardHeight = windowHeight / 4;
  const hugDescMaxHeight = windowHeight / 7.3;
  const hugImageWidth = hugCardWidth / 4;
  const hugDescWidth = hugCardWidth / 1.5;
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
      backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.4)' : 'white',
    },
    nameBar: {
      display: 'flex',
      backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0.6)' : 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingLeft: 5,
    },
    outerImageContainer: {
      marginRight: 20, 
    },
    pinContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: 'pink',
    },
    hugCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.6,
        shadowRadius: 50,
        elevation: 7,
        borderRadius: 20,
        backgroundColor: mode == 'dark' ? 'rgba(0,0,0,0)' : 'white',
        marginBottom: 5,
        marginTop: 5,
    },
    bodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    textContainer: {
    },
    pinIcon: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    pinButton: {
    },
    imageContainer: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        margin: 10,
        fontSize: 20,
        color: mode == 'dark' ? 'white' : 'black',
    },
    hugText: {
        marginLeft: 10,
        fontSize: 15,
        paddingTop: 10,
        color: mode == 'dark' ? 'white' : 'black',
    },
  })
  
  return (
    /* container */
      <View style={[styles.hugCardContainer, { 
        width: hugCardWidth, 
        height: hugCardHeight 
      }]}>
        
        {/* Name Bar */}
        <View style={styles.nameBar}>
          <Text style={styles.name}>
              {name}
          </Text>
        </View>

        {/* Everything else */}
        <View style={styles.outerContainer}>
          <View style={styles.bodyContainer}>
            <View style={styles.textContainer}>
              <View style={{ 
                width: hugDescWidth,
                overflow: 'hidden',
                maxHeight: hugDescMaxHeight
              }}>
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

            <TouchableOpacity 
                onPress={() => pinPress()}
                style={styles.pinButton}
            >
              <View style={[styles.pinContainer, {
                margin: 10,
                width: pinHeight, 
                height: pinHeight
              }]}>

                <Image
                  source={require('assets/pinIcon.png')}
                  style={[styles.pinIcon, {
                    width: pinHeight * 0.8, 
                    height: pinHeight * 0.8
                  }]}
                />
              </View>
            </TouchableOpacity>

          </View>

          <View style={[styles.outerImageContainer, { 
            marginTop: mode == 'light' ? hugCardHeight / 30 : hugCardHeight / 8,
          }]}>
            <View style={[styles.imageContainer, {
              width: hugImageWidth, 
              height: hugImageWidth
            }]}> 
              <Image
                source={hugImage}
                style={[styles.imageContainer, {
                  width: hugImageWidth, 
                  height: hugImageWidth
                }]}
              />
            </View>        
          </View>
        </View>

      </View>
  )
}
