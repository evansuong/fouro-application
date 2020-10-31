import React from 'react'
import { View, Text, Button } from 'react-native'

export default function CreateHugPage({ history }) {
    return (
        <View>
            <Text>hug page</Text>
            <Button title="back" onPress={() => history.push({
                pathname: "/",
                state: 1,
            })}/>
        </View>
    )
}
