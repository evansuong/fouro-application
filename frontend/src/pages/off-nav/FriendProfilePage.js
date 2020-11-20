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
    const icon = require("../../../assets/overflowMenuIcon.png");

    return (

        <View>
            {/* option overflow button (remove friend button) */}
            <View style={styles.removeFriendOverlay}>
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
    },

    logo: {
        width: "80%",
        height: "80%",
      }
});