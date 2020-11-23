import { StyleSheet, Button, Text, View, Dimensions, ScrollView } from 'react-native'
import React, {useEffect} from 'react'

import AppStyles from '../../AppStyles'

import HugCard from 'components/HugCard'



export default function HomePage({ navigation }) {


  function buildTestData(name, text, img, id) {
    return {
      name: name,
      hugText: text,
      hugImage: img,
      hugId: id,
    }
  }

  const testData = [
    buildTestData('Vicki', 'do you remember', require('assets/profilePic.jpg'), 1),
    buildTestData('Ricky', 'the 21st night of september Chow', require('assets/profilePic.jpg'), 2),
    buildTestData('Alex', 'soulja boy tellem', require('assets/profilePic.jpg'), 3),
    buildTestData('Evan', 'nobody \n \n\npray for\n me if t\nhey n\no\n\n\n\n\n\nt \n there \n \n \n for me', require('assets/profilePic.jpg'), 4),
    buildTestData('Vivian', 'weeeeeeeeeeelll yea yea', require('assets/profilePic.jpg'), 5),
  ]

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
            onPress={() => navigation.navigate('Friend Profile')} 
          />

          <Button
            title='hug info page'
            onPress={() => navigation.navigate('Hug Info')}
          />
          
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            {testData.map(hugData => (
              <HugCard 
                 key={hugData.hugId} 
                 navigation={navigation}
                 { ...hugData } 
              />
            ))}
          </ScrollView>
      </View>
    )
}