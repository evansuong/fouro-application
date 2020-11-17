import React from 'react';
import OptionsMenu from "react-native-options-menu";
import { View, Text, StyleSheet } from 'react-native';

// const removeFriendHandler = () => {
//     console.log("removed friend");
//     //setResults(`Email: ${emailField}   |   Password: ${passwordField}   |   Password Confirmation: ${passwordConfirmField}`);
//   }

function removeFriend() {
    console.log("removing friend");
}

export default function FriendProfilePage() {
    const icon = require("../../../assets/overflowMenuIcon.png");

    return (
        <View>
            <View style={styles.removeFriendOverlay}>
                <OptionsMenu
                    button={icon}
                    buttonStyle={styles.button}
                    options={["remove friend"]}
                    actions={[removeFriend]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 75,
        height: 30,
        resizeMode: 'contain',
        marginTop: 15,
        marginRight: -10
    },

    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    }
});