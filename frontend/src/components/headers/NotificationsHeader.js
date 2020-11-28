import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'

const {screenHeight, screenWidth} = Dimensions.get('window');

//comment
export default function Header() {

    return (
        <View style={styles.header}>
            <Text style={styles.text}>Notifications</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 27,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    searchButton: {
        width: 25,
        height: 25,
        marginRight: 20
    }
});