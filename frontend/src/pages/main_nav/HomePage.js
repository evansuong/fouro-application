import { StyleSheet, Button, Text, View, ScrollView } from 'react-native'
import React from 'react'
import AppStyles from '../../AppStyles'
import { FlatList } from 'react-native-gesture-handler';

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
    buildTestData('Evan', 'nobody pray for me if they not there for me', require('assets/profilePic.jpg'), 4),
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
          
          <ScrollView>
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