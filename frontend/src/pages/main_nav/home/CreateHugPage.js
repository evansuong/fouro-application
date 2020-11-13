import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StreakPanel from 'components/streakPanel';
import FriendListing from 'components/friendListing';

export default function CreateHugPage() {
    const profilePic1 = require('../../../../assets/profilePic.jpg');

    return (
        <View>
            <Text>hug page</Text>
            <StreakPanel />
            <View>
              <Text>Why</Text>
            </View>
            <FriendListing 
              profilePicture={profilePic1}
              friendName='Friend A'
              style={styles.firstFriendListing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  firstFriendListing: {
    marginTop: 50,
  }
});
