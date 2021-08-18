import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Custom Components
import LinkedButton from 'components/LinkedButton';
// Assets/Images
import fouroLogo from 'assets/fouro_logo.png';
import backgroundImg from 'assets/fouro_background.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const _ = require('lodash');

export default function LaunchPage({ navigation, route }) {
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const [startUp, setStartUp] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: windowWidth * 0.2,
    },
    logo: {
      width: windowWidth * 0.75,
      height: windowWidth * 0.75,
    },
    logoContainer: {
      position: 'absolute',
      height: '100%',
      width: windowWidth,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute', 
      width: '100%', 
      height: '100%',
    }
  })

  const getAuth = async () => {
    try {
      const auth = await AsyncStorage.getItem("auth");
      return auth != null ? JSON.parse(auth) : null;
    } catch (e) {
      Alert.alert("Error", e);
    }
  }

  const login = async () => {
    const auth = await getAuth();
    if(auth) {
      navigation.navigate('Main Nav Page', {...auth, loggedIn: 'undefined'});
    }
    setStartUp(false);
  }

  useEffect(() => {
    if(startUp && !_.get(route, "params.notInApp")) {
      login();
    }
  }, [startUp]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        style={styles.backgroundImage}
      >
        {/* logo */}
        <View style={styles.logoContainer}>
          <Image
            source={fouroLogo}
            style={styles.logo}
          />
        </View>

        {/* Buttons */}
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