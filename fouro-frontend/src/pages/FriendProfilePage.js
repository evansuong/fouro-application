import React from 'react'
import { View, Text, Button } from 'react-native'

export default function FriendProfilePage({ history }) {
    return (
        <View>
            <Text>friend profile</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 1,
            })}/>
        </View>
    )
}
