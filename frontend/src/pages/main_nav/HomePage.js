import { StyleSheet, Button, Text, View } from 'react-native'
import React from 'react'
import AppStyles from '../../AppStyles'
import Background from 'components/Background';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage({ navigation }) {

    return (
      <>
        <View style={styles.background}>
          <Background direction='middle' />
        </View>
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
        </View>
      </>
    )
}

const styles = StyleSheet.create({
  background: {
      position: 'absolute',
      width: '100%'
  }
})