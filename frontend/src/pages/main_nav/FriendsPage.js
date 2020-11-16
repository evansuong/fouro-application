import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
            
            {
                friends.map((friend) => {
                    //let testProfilePic = require(friend.friend_profile_picture)
                    return (
                        <FriendCard
                            profilePicture={friend.friend_profile_picture}
                            friendName={friend.friend_first + " " + friend.friend_last}
                            friendColorString={friend.friend_color}
                            key={friend.friend_id}
                        />
                    )
                })
            }
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