/**
 * Authors:
 *      Evan:       overall card container
 *      Rickesh:    hug image
 *      Vicki:      friend name
 *      Vivian:     hug description
 *      Alex:       pin button
 * */

import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DimensionContext } from '../contexts/DimensionContext'


export default function HugCard({ navigation, name, hugText, hugImage, hugId }) {

  const dimensions = useContext(DimensionContext)
        
  const pinPress = () => {
    console.log('pinning hug');
    // Navigate to corkboard
    navigation.navigate('Corkboard')
    // and add hug to the corkboard
  }
  
  return (
    /* container */
    <View style={styles.hugCardContainer}>
        
        {/* text area */}
        <View style={styles.bodyContainer}>
            <View style={styles.textContainer}>

                {/* friend name */}
                <Text style={styles.name}>
                    {name}
                </Text>

                {/* hug description */}
                <Text style={styles.hugText}>
                    {hugText}
                </Text>
            </View>            

            {/* Pin button */}
            <TouchableOpacity onPress={() => pinPress()}>

                {/* Pin icon */}
                <Image
                    source={require('assets/pinIcon.png')}
                    style={styles.pinButton}
                />
                
            </TouchableOpacity>
                
        </View>

        {/* image */}
        <View style={styles.imageContainer}>
            
            {/* hug image */}
            <Image
                source={hugImage}
                style={styles.hugImage}
            />
            
        </View>       

    </View>
  )
}

const styles = StyleSheet.create({

    hugCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.41,
        shadowRadius: 50,
        elevation: 14,
        backgroundColor: 'rgba(166,166,166,1)',
        margin: 5,
    },
    bodyContainer: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'space-between',
    },
    textContainer: {
    },
    pinButton: {
        borderRadius: 50,
        width: 20,
        height: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        width: 50,
        height: 50
    },
    name: {
        margin: 10,
        fontSize: 20
    },
    hugText: {
        fontSize: 15,
        color: 'black'
    },
    hugImage: {
        borderRadius: 20,
        width: 60,
        height: 60,
    }
})
