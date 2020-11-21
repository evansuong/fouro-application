import React from 'react'
import { View, StyleSheet, OptionsMenu, Dimensions } from 'react-native'

const {screenHeight, screenWidth} = Dimensions.get('window');

//comment
export default function Header() {

    const icon = require("assets/overflowMenuIcon.png");

    return (
        /* option overflow button (remove friend button) */
        <View style={styles.removeFriendOverlay}>
            {/* add a 'close' option */}
            <OptionsMenu
                button={icon}
                buttonStyle={styles.button}
                options={["remove friend"]}
                actions={[removeFriend]} />
        </View>
    );
}

const styles = StyleSheet.create({
    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
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