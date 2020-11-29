import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native'
import LinkedButton from 'components/LinkedButton';
import AppStyles from '../../AppStyles';

// TODO: Figure out how to get custom background colors into each
// LinkedButton component

// const image = { uri: '../../assets/tempBackground.png'};

export default function LaunchPage({ navigation }) {
  const background = require('../../../assets/tempBackground.png');

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={background}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      >
        <View style={styles.innerContainer}>
          <LinkedButton 
            navigation={navigation} 
            link='Login Page'
            text='LOGIN'
            color='#FB7250'
          />

          <LinkedButton
            navigation={navigation}
            link='Signup Page'
            text='SIGNUP'
            color='#FFC24A'
          />
        </View>
      </ImageBackground>
    </View>
  );
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '30%',
  }
})