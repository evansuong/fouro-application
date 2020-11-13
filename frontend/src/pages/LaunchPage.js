import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native'
import LinkedButton from '../components/linkedButton';
import AppStyles from '../AppStyles';

// TODO: Figure out how to get custom background colors into each
// LinkedButton component

// const image = { uri: '../../assets/tempBackground.png'};

export default function LaunchPage({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/tempBackground.png')}
        style={AppStyles.backgroundStyle}
      >
        <View style={styles.innerContainer}>
          <LinkedButton 
            navigation={navigation} 
            link='Login Page'
            text='LOGIN'
          />

          <LinkedButton
            navigation={navigation}
            link='Signup Page'
            text='SIGNUP'
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