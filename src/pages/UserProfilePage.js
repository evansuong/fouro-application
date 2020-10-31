import React from 'react'
import { View, Text, Button } from 'react-native'

export default function UserProfilePage({ history }) {
    return (
        <View>
            <Text>user profile</Text>
            <Button title="view corkboard" onPress={() => history.push("corkboard")}/>
            <Button title="hug info" onPress={() => history.push("hug-info")}/>
        </View>
    )
}
