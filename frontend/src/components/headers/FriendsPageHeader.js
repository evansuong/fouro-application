import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'

const {screenHeight, screenWidth} = Dimensions.get('window');

//comment
export default function Header() {

    return (
        <View style={styles.header}>
            <Text style={styles.text}>Friends</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 27,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginLeft: 20
    },
    searchButton: {
        width: 25,
        height: 25,
        marginRight: 20
    }
});