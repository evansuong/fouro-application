import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Images/Assets
import pinIcons from 'assets/pinIcons/pinIcons'

function randomPinIcon() {
    const randNum = Math.floor(Math.random() * 40)
    return pinIcons.pinIcons[randNum]
}

export default function PinnedHug( { navigation, unpin, picture, date, friendName, id } ) {
    // States
    const [startUp, setStartUp] = useState(true);
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    // Misc
    const hugWidth = windowWidth / 2.5;
    const hugHeight = windowHeight / 3.15;
    const imgContainerWidth = hugWidth * 0.9;
    const imgContainerHeight = imgContainerWidth;
    const margin = windowWidth * 0.03;
    const pinWidth = imgContainerWidth * 0.2;
    const pinHeight = pinWidth;

    useEffect(() => {
      if (startUp) {
        setStartUp(false);
      }
    }, [])

    const data = {
      image: picture,
      hug_id: id,
      pinned: true
    }

    return(
      /* Hug */
      <TouchableOpacity
        onPress={() => navigation.navigate('Hug Info', { data: data })}
        style={[styles.pinnedHug, { width: hugWidth, height: hugHeight, margin: margin }]}
      >
        <Image
          source={randomPinIcon()}
          style={{ width: pinWidth, height: pinHeight }}
        />
        <Image
          source={{ uri: picture }} // was picture
          style={[styles.hugImage, { width: imgContainerWidth, height: imgContainerHeight }]}
        />
        {/* metadata */}
        <View style={styles.metadata}>
          <Text style={styles.text}> { date } </Text>
          <Text style={styles.text}> { friendName } </Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pinnedHug: {
        backgroundColor: '#D4D4D4',
        alignItems: 'center',
        elevation: 4
    },
    hugImage: {
        backgroundColor: 'white',
        resizeMode: 'contain',
    },
    metadata: {
        display: "flex",
        alignItems: 'center',
        width: '100%'
    },
    text: {
        color: '#454545',
        fontSize: 13
    }
})