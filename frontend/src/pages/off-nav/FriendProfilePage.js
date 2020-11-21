import React from 'react';
import OptionsMenu from "react-native-options-menu";
import { View, Text, StyleSheet, Image } from 'react-native';
import UserProfile from '../../components/UserProfile';

// const removeFriendHandler = () => {
//     console.log("removed friend");
//     //setResults(`Email: ${emailField}   |   Password: ${passwordField}   |   Password Confirmation: ${passwordConfirmField}`);
//   }

function removeFriend() {
    console.log("removing friend");
}

export default function FriendProfilePage() {
    const icon = require("assets/overflowMenuIcon.png");

    return (

        <View>
            {/* option overflow button (remove friend button) */}
            <View style={styles.removeFriendOverlay}>
                {/* add a 'close' option */}
                <OptionsMenu
                    button={icon}
                    buttonStyle={styles.button}
                    options={["remove friend"]}
                    actions={[removeFriend]} />
            </View>
            
            {/* user profile information */}
            <UserProfile 
                profilePicture={require("assets/profilePic.jpg")}
                userFirstLast = "vicki chen"
                username = "vickichn" 
            />            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute', // now we can place it wherever
        width: 75,
        height: 30,
        resizeMode: 'contain',
        top: 15, // the wherever, top margin
        right: -15 // the wherever, right margin. still don't know why it's neg
        // marginTop: 60,
        // marginRight: -10
    },

    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
});