import React from 'react'
import { View, Text, Button } from 'react-native'

export default function FriendHistoryPage({ history }) {
    return (
        <View>
            <Text>friend history</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 1,
            })}/>
        </View>
    )
}
