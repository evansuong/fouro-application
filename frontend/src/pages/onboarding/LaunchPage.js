import React, { useState, useContext } from 'react';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Custom Components
import LinkedButton from 'components/LinkedButton';
// Assets/Images
import fouroLogo from 'assets/fouro_logo.png';


export default function LaunchPage({ navigation }) {
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const roundedWidth = Math.round(windowWidth / 100) * 100;
  const roundedHeight = Math.round(windowWidth / 100) * 100;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: '30%',
    },
    logo: {
      width: windowWidth,
      height: windowWidth,
      marginTop: windowWidth / 2,
    }
  })

  return (
    <View style={styles.container}>
      {/* <ImageBackground 
        source={background}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      > */}
      <ImageBackground
        source={{ uri: `https://picsum.photos/${roundedWidth}/${roundedHeight}`}}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      >
        <View>
          <Image
            source={fouroLogo}
            style={styles.logo}
          />
        </View>
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