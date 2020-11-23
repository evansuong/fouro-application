import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import { DimensionContext } from '../contexts/DimensionContext';

export default function PinnedHug( { navigation, unpin, picture, date, friendName, id } ) {

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const hugWidth = windowWidth / 2.5
    const hugHeight = windowHeight / 3.5
    const imgContainerWidth = hugWidth * 0.9
    const imgContainerHeight = imgContainerWidth
    const margin = windowWidth * 0.03

    return(
            /* Hug */
            <TouchableOpacity
                onLongPress={() => unpin()}
                onPress={() => navigation.navigate('Hug Info')}
                style={[styles.pinnedHug, { width: hugWidth, height: hugHeight, margin: margin }]}>

                <Image
                    source={{ uri: picture }}
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
    },
    hugImage: {
        marginTop: 5,
        backgroundColor: 'white',
        resizeMode: 'contain',
    },
    metadata: {
        display: "flex",
        alignItems: 'flex-start',
        width: '100%'
    },
    text: {
        color: '#454545'
    }
})