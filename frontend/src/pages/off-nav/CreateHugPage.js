import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StreakPanel from 'components/StreakPanel';

export default function CreateHugPage() {
    return (
        <View>
            <Text>hug page</Text>
            <StreakPanel />
            <View>
              <Text>Why</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  firstFriendListing: {
    marginTop: 50,
  }
});
