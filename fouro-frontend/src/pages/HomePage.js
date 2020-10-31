import React from 'react'
import { View, Text, Button } from 'react-native'

export default function HomePage({ history }) {
    return (
        <View>
            <Text>home</Text>
            <Button title="create hug" onPress={() => history.push("create-hug")}/>
            <Button title="add friend" onPress={() => history.push("add-friend")}/>
            <Button title="friend history" onPress={() => history.push("friend-history")}/>
            <Button title="friend profile" onPress={() => history.push("friend-profile")}/>
        </View>
    )
}
