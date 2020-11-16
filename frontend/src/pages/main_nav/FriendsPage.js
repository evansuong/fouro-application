import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import AppStyles from '../../AppStyles'
import FriendCard from '../../components/FriendCard'

export default function FriendsPage() {

    const testProfilePic = require('../../../assets/profilePic.jpg')

    return (
        <View style={AppStyles.navPageContainer}>
            {/* <Text>friends page</Text> */}
            {/* <Button 
                title="friend history" 
                onPress={() => navigation.navigate('Friend History')}
            />
            <Button 
                title="friend profile" 
                onPress={() => navigation.navigate('Friend Profile')}
            /> */}
            <FriendCard
                profilePicture={testProfilePic}
                friendName="Don't"
                friendColorString='rgba(255, 100, 0, 1)'
            />
            <FriendCard
                profilePicture={testProfilePic}
                friendName='let'
                friendColorString='rgba(255, 120, 0, 1)'
            />
            <FriendCard
                profilePicture={testProfilePic}
                friendName='your'
                friendColorString='rgba(255, 140, 0, 1)'
            />
            <FriendCard
                profilePicture={testProfilePic}
                friendName='dreams'
                friendColorString='rgba(255, 160, 0, 1)'
            />
            <FriendCard
                profilePicture={testProfilePic}
                friendName='be'
                friendColorString='rgba(255, 180, 0, 1)'
            />
            <FriendCard
                profilePicture={testProfilePic}
                friendName='memes'
                friendColorString='rgba(255, 200, 0, 1)'
            />
        </View>
    )
}