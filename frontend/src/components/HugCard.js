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
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'

export default function HugCard({ navigation, name, hugText, hugImage, hugId }) {

  const {windowWidth, windowHeight} = useContext(DimensionContext)

  const hugCardWidth = windowWidth - 20
  const hugDescMaxHeight = windowHeight / 6
  const hugImageWidth = hugCardWidth / 4
  const hugDescWidth = hugCardWidth / 1.5
  const pinHeight = hugCardWidth / 13
  const pinWidth = pinHeight
  
  const pinPress = () => {
    console.log('pinning hug');
    // Navigate to corkboard
    navigation.navigate('Corkboard')
    // and add hug to the corkboard
  }
  
  return (
    /* container */
    <View style={[styles.hugCardContainer, { width: hugCardWidth }]}>
        
        {/* text area */}
        <View style={styles.bodyContainer}>
            <View style={styles.textContainer}>

                {/* friend name */}
                <Text style={styles.name}>
                    {name}
                </Text>

                {/* hug description */}
                <View style={{ 
                    width: hugDescWidth,
                    // backgroundColor: 'pink',
                    overflow: 'hidden',
                    maxHeight: hugDescMaxHeight
                    }}>
                    <ScrollView nestedScrollEnabled={true}>
                        <Text style={styles.hugText}>
                            {hugText}
                        </Text>
                    </ScrollView>
                </View>
            </View>            

            {/* Pin button */}
            <TouchableOpacity 
                onPress={() => pinPress()}
                style={styles.pinButton}
            >

                {/* Pin icon */}
                <Image
                    source={require('assets/pinIcon.png')}
                    style={[styles.pinIcon, {width: pinWidth, height: pinHeight}]}
                />
                
            </TouchableOpacity>
                
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* image */}
            <View style={[styles.imageContainer, {width: hugImageWidth, height: hugImageWidth}]}>
                
                {/* hug image */}
                <Image
                    source={hugImage}
                    style={[styles.imageContainer, {width: hugImageWidth, height: hugImageWidth}]}
                />
                
            </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({

    hugCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.41,
        shadowRadius: 50,
        elevation: 7,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 10,
        marginBottom: 5,
        marginTop: 5
    },
    bodyContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'space-between',
    },
    textContainer: {
    },
    pinIcon: {
        borderRadius: 50,
        // width: 25,
        // height: 25,
        overflow: 'hidden',
        backgroundColor: 'pink'
    },
    pinButton: {
        margin: 10,        
    },
    imageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        margin: 10,
        fontSize: 20
    },
    hugText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'black',
    },
    hugImage: {
        borderRadius: 20,
        width: 60,
        height: 60,
    }
})
