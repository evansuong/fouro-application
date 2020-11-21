import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import UserProfile from '../../components/UserProfile';
import FriendProfileHeader from '../../components/headers/FriendProfileHeader'

// const removeFriendHandler = () => {
//     console.log("removed friend");
//     //setResults(`Email: ${emailField}   |   Password: ${passwordField}   |   Password Confirmation: ${passwordConfirmField}`);
//   }

export function removeFriend() {
    console.log("removing friend");
}

export default function FriendProfilePage({ navigation }) {
    const icon = require("assets/overflowMenuIcon.png");

    return (

        <View>
            <FriendProfileHeader navigation={navigation}/>
            
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
    },
    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
});