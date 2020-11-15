import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import AppStyles from '../../AppStyles'

export default function FriendsPage() {
    return (
        <View style={AppStyles.navPageContainer}>
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
