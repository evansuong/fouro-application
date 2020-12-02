import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import AppStyles from '../../AppStyles'
import FriendCard from '../../components/FriendCard'
import Header from '../../components/Header'
import { DimensionContext } from '../../contexts/DimensionContext'

export default function FriendsPage({ navigation, route }) {

    const gradient = require('assets/gradients/left.png')
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const routeName = route.name;

    const friends = 
    //  BACKEND TODO: replace this list with a fetch call or firestore equivalent
        [[],
        {
            friend_id: '1',
            friend_first: 'Alex',
            friend_last: 'Chow',
            friend_profile_picture: 'https://picsum.photos/200',
            hug_count: 9,
            friend_color: '#FE5951'
        },
        {
            friend_id: '2',
            friend_first: 'Vivian',
            friend_last: 'Tang',
            friend_profile_picture: 'https://picsum.photos/199',
            hug_count: 6,
            friend_color: '#FC6C58'
        },
        {
            friend_id: '3',
            friend_first: 'Evan',
            friend_last: 'Suong',
            friend_profile_picture: 'https://picsum.photos/198',
            hug_count: 1000,
            friend_color: '#FA7D5D'
        },
        {
            friend_id: '4',
            friend_first: 'Evan',
            friend_last: 'Serrano',
            friend_profile_picture: 'https://picsum.photos/201',
            hug_count: 1000,
            friend_color: '#F88E63'
        },
        {
            friend_id: '5',
            friend_first: 'Vicki',
            friend_last: 'Chen',
            friend_profile_picture: 'https://picsum.photos/202',
            hug_count: 9,
            friend_color: '#F69D68'
        },
        {
            friend_id: '6',
            friend_first: 'Alana',
            friend_last: 'Klopstein',
            friend_profile_picture: 'https://picsum.photos/203',
            hug_count: 6,
            friend_color: '#EFBA7C'
        },
        {
            friend_id: '7',
            friend_first: 'Rickesh',
            friend_last: 'Khilnani',
            friend_profile_picture: 'https://picsum.photos/204',
            hug_count: 1000,
            friend_color: '#EFCF7C'
        },
        {
            friend_id: '8',
            friend_first: 'Tyus',
            friend_last: 'Liu',
            friend_profile_picture: 'https://picsum.photos/205',
            hug_count: 1000,
            friend_color: '#EFD67C'
        },
        {
            friend_id: '9',
            friend_first: 'Vuk',
            friend_last: 'Radovanovic',
            friend_profile_picture: 'https://picsum.photos/206',
            hug_count: 1000,
            friend_color: '#D2CA94'
        },
        {
            friend_id: '10',
            friend_first: 'Eman',
            friend_last: 'Sherif',
            friend_profile_picture: 'https://picsum.photos/207',
            hug_count: 1000,
            friend_color: '#BCC1A6'
        },
        {
            friend_id: '11',
            friend_first: 'Terry',
            friend_last: 'Feng',
            friend_profile_picture: 'https://picsum.photos/208',
            hug_count: 1000,
            friend_color: '#A4B8B9'
        }
        ]


    const renderCards = friend => {
        console.log(friend)
        // NOTE: Depending on how the data is retrieved from firebase/firestore,
        // we'll need to rewrite how we get each friend
        //console.log(friend.item.friend_first)
        if (friend.index === 0) {
            return <View style={{ height: windowHeight / 8 }}/>

        } else {
            return  <FriendCard
                        profilePicture={friend.item.friend_profile_picture}
                        friendName={friend.item.friend_first + " " + friend.item.friend_last}
                        friendColorString={friend.item.friend_color}
                        key={friend.item.friend_id}
                        navigation={navigation}
                        height={windowHeight / 15}
                        width={windowWidth - 40}
                    /> 
        }
        
       
    
    }

    return (
        <View style={{...styles.navPageContainer}}>
            {/* background */}
            <Image
                source={gradient}
                style={[styles.background, { width: windowWidth, height: windowHeight }]}
            />
            <Header routeName={routeName} navigation={navigation} onMainNav={true}>Friends</Header>

            <FlatList
                data={friends}
                renderItem={renderCards}
                contentContainerStyle={{ paddingTop: 10}}
            />
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