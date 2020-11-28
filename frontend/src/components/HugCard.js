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
  const hugDescMaxHeight = hugCardHeight / 2.5;
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
      marginRight: 10, 
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
    },
    bodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    textContainer: {
      marginLeft: 15
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
            <View style={[styles.textContainer, {
              width: hugDescWidth,
              overflow: 'hidden',
              maxHeight: hugDescMaxHeight
            }]}>
              <ScrollView 
                nestedScrollEnabled={true}
                persistentScrollbar={true}
                //contentContainerStyle={{backgroundColor: 'pink'}}
              >
                <Text style={styles.hugText}>
                    {hugText}
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity 
                onPress={() => pinPress()}
                style={styles.pinButton}
            >
              <View style={[styles.pinContainer, {
                margin: 10,
                marginLeft: 15,
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
