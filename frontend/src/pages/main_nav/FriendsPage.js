import React from 'react'
import { View, Text, Button } from 'react-native'

export default function FriendsPage() {
    return (
        <View>
            <Text>friends page</Text>
            <Button 
                title="friend history" 
                onPress={() => navigation.navigate('Friend History')}
            />
            <Button 
                title="friend profile" 
                onPress={() => navigation.navigate('Friend Profile')}
            />
        </View>
    )
}
