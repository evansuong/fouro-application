import React from 'react'
import { View, Text, Button } from 'react-native'

export default function HugInfoPage({ history }) {
    return (
        <View>
            <Text>hug info</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 0,
            })}/>
        </View>
    )
}
