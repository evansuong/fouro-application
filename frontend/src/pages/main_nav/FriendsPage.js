import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import AppStyles from '../../AppStyles'
import FriendCard from '../../components/FriendCard'

export default function FriendsPage() {

    const friends = 
    //  BACKEND TODO: replace this list with a fetch call or firestore equivalent
        [{
            friend_id: '1',
            friend_first: 'Dont',
            friend_last: 'let',
            friend_profile_picture: 'https://picsum.photos/200',
            hug_count: 9,
            friend_color: '#FE5951'
        },
        {
            friend_id: '2',
            friend_first: 'your',
            friend_last: 'dreams',
            friend_profile_picture: 'https://picsum.photos/200',
            hug_count: 6,
            friend_color: '#FE5951'
        },
        {
            friend_id: '3',
            friend_first: 'be',
            friend_last: 'memes',
            friend_profile_picture: 'https://picsum.photos/200',
            hug_count: 1000,
            friend_color: '#FE5951'
        }
        ]

    const renderCards = friend => (
        // NOTE: Depending on how the data is retrieved from firebase/firestore,
        // we'll need to rewrite how we get each friend
        //console.log(friend.item.friend_first)
        <FriendCard
            profilePicture={friend.item.friend_profile_picture}
            friendName={friend.item.friend_first + " " + friend.item.friend_last}
            friendColorString={friend.item.friend_color}
            key={friend.item.friend_id}
        />
    )

    return (
        <View style={styles.navPageContainer}>
            {/* <Text>friends page</Text> */}
            {/* <Button 
                title="friend history" 
                onPress={() => navigation.navigate('Friend History')}
            />
            <Button 
                title="friend profile" 
                onPress={() => navigation.navigate('Friend Profile')}
            /> */}
            <FlatList
                data={friends}
                renderItem={renderCards}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    navPageContainer: {
      display: 'flex',
      backgroundColor: 'transparent',
      height: '100%',
      alignItems: 'center'
    }
  });