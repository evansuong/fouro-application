import React, { useContext, useState } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import AppStyles from '../../AppStyles'
import FriendCard from '../../components/FriendCard'
import Header from '../../components/Header'
import { DimensionContext } from '../../contexts/DimensionContext'
import SearchPage from '../off-nav/SearchPage'

export default function FriendsPage({ navigation, route }) {

    const gradient = require('assets/gradients/left.png')
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const routeName = route.name;

    function buildFriendData(id, name, username, profile_pic, color) {
        return {
            id: id,
            name: name,
            username: username, 
            profile_pic: profile_pic,
            color: color
        }
    }

    let pic = require("assets/profilePic.jpg")

    let friends = [
        buildFriendData('1', 'Alex Chow', 'alexchow', pic, '#FE5951'),
        buildFriendData('2', 'Vivian Tang', 'vtang', pic, '#FC6C58'),
        buildFriendData('3', 'Evan Suong', 'esuong', pic, '#FA7D5D'),
        buildFriendData('4', 'Evan Serrano', 'eserrano', pic, '#F88E63'),
        buildFriendData('5', 'Alana Klopstein', 'aklopstein', pic, '#F69D68'),
        buildFriendData('6', 'Rickesh Khilnani', 'rkhil', pic, '#EFBA7C'),
        buildFriendData('7', 'Tyus Liu', 'tliu', pic, '#EFCF7C'),
        buildFriendData('8', 'Vuk Radovanovic', 'vrad', pic, '#EFD67C'),
        buildFriendData('9', 'Eman Sherif', 'esherif', pic, '#D2CA94'),
        buildFriendData('10', 'Terry Feng', 'tfeng', pic, '#BCC1A6'),
        buildFriendData('11', 'Vivki Chen', 'cvhen', pic, '#A4B8B9'),
    ]

    const renderCards = friend => {
        // console.log(friend)
        // NOTE: Depending on how the data is retrieved from firebase/firestore,
        // we'll need to rewrite how we get each friend
        //console.log(friend.item.friend_first)
        return  <FriendCard
                    profilePicture={friend.item.profile_pic}
                    friendName={friend.item.name}
                    friendColorString={friend.item.color}
                    friendData={friend.item}
                    key={friend.item.id}
                    navigation={navigation}
                    height={windowHeight / 15}
                    width={windowWidth - 40}
                /> 
        
    }

    return (
        <View style={AppStyles.navPageContainer}>
            {/* background */}
            <Image
                source={gradient}
                style={[styles.background, { width: windowWidth, height: windowHeight }]}
            />

            <View style={{height: windowWidth * 0.27 }}/>
            <Header routeName={routeName} navigation={navigation} onMainNav={true}>Friends</Header>
            {
                <View style={{display: 'flex', flexShrink: 1}}>
                <FlatList
                    data={friends}
                    keyExtractor={item => item.friend_id}
                    renderItem={renderCards}
                    contentContainerStyle={{ width: windowWidth, alignItems: 'center', marginTop: 5, paddingBottom: 5 }}
                />
                </View>
            } 
        </View>
    )
}

const styles = StyleSheet.create({
    navPageContainer: {
      display: 'flex',
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexShrink: 1
    },
    background: {
        position: 'absolute',
    },
});