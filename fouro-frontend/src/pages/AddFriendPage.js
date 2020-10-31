import React from 'react'
import { View, Text, Button } from 'react-native'

export default function AddFriendPage({ history}) {
    return (
        <View>
            <Text>add friend</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 1,
            })}/>
        </View>
    )
}
