import React from 'react'
import { View, Text } from 'react-native'

export default function Header({title}) {

    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}
