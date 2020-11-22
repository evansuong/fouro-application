import { StyleSheet, Button, Text, View, Dimensions } from 'react-native'
import React from 'react'
import AppStyles from '../../AppStyles'
import Background from 'components/Background';
import { LinearGradient } from 'expo-linear-gradient';



export default function HomePage({ navigation }) {

    return (
      <View style={AppStyles.navPageContainer}>
          <Text>home</Text>
          <Button 
            title="create hug" 
            onPress={() => navigation.navigate('Create Hug')}
          />
          <Button 
            title="add friend" 
            onPress={() => navigation.navigate('Add Friend')}
          />
          <Button
            title='launch page'
            onPress={() => navigation.navigate('Launch Page')}
          />

          {/* temporary to test friend profile page */}
          <Button
            title='friend profile'
            onPress={() => navigation.navigate('Friend Profile')} />
            
          <Button
            title='hug info page'
            onPress={() => navigation.navigate('Hug Info')}
          />
      </View>
    )
}
