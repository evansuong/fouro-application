import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import UserProfile from '../../components/UserProfile';
import FriendProfileHeader from '../../components/headers/FriendProfileHeader'

// const removeFriendHandler = () => {
//     console.log("removed friend");
//     //setResults(`Email: ${emailField}   |   Password: ${passwordField}   |   Password Confirmation: ${passwordConfirmField}`);
//   }



export default function FriendProfilePage({ navigation }) {
    const icon = require("assets/overflowMenuIcon.png");

    return (

        <View>
            <FriendProfileHeader 
                navigation={navigation}
                style={styles.header}
            />
            
            <View style={styles.userProfile}>
                {/* user profile information */}
                <UserProfile 
                    profilePicture={require("assets/profilePic.jpg")}
                    userFirstLast = "vicki chen"
                    username = "vickichn"
                />
            </View>            
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        zIndex: 3
    },
    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    userProfile: {
        position: 'absolute',
        marginTop: 20,
        zIndex: -1
    }
});