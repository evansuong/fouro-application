import React from 'react'
import { Button, Text, View } from 'react-native'
import AppStyles from '../AppStyles'

export default function UserProfileScreen( { navigation } ) {
    return (
        <View style={AppStyles.container}>
            <Text>my profile</Text>
            <Button title="corkboard" onPress={() => navigation.navigate('Corkboard')}/>
            <Button title="hug info" onPress={() => navigation.navigate('Hug Info')}/>
        </View>
    )
}