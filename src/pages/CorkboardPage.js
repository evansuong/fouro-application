import React from 'react'
import { View, Text, Button } from 'react-native'

export default function CorkboardPage({ history }) {
    return (
        <View>
            <Text>corkboard</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 0,
            })} />
        </View>
    )
}
