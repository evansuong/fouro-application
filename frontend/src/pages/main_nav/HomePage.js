import React, { useState, useRef, useEffect, useContext } from 'react'
import { 
  StyleSheet, 
  Button, 
  Text, 
  View, 
  Dimensions, 
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  Image
} from 'react-native'

import AppStyles from '../../AppStyles'
import { FlatList } from 'react-native-gesture-handler';

import HugCard from 'components/HugCard'
import HomeHeader from 'components/headers/HomePageHeader';
import Panel from 'components/StreakPanel';
import CreateHugButton from 'components/CreateHugButton';
import { DimensionContext } from '../../contexts/DimensionContext'; 

// TODO: Move create hug button to the right side of the screen.
// TODO: Fix button animation starting from far left of button

export default function HomePage({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState('light');
  const { windowWidth, windowHeight } = useContext(DimensionContext)

  const width = useRef(new Animated.Value(70)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const animationDuration = 150;

  const gradient = require('assets/gradients/middle.png')

  function buildTestData(name, text, img, id) {
    return {
      name: name,
      hugText: text,
      hugImage: img,
      hugId: id,
    }
  }

  function handlePress() {
    setExpanded(!expanded);
    if (expanded) {
      navigation.navigate('Create Hug');
      collapse();
    } else {
      expand();
    }
  }

  function handleToggleSwitch() {
    setIsEnabled(!isEnabled);
    setMode((prevMode) => 
      prevMode == 'light' ? setMode('dark') : setMode('light')
    );
  }

  function dismissCreateButton() {
    setExpanded(false);
    collapse();
  }

  function expand() {
    Animated.spring(width, {
      toValue: 200,
      duration: animationDuration,
      bounciness: 1,
      speed: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 1,
      duration: animationDuration + 700,
      useNativeDriver: false,
    }).start();
  }

  function collapse() {
    Animated.spring(width, {
      toValue: 70,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 0,
      duration: animationDuration - 100,
      useNativeDriver: false,
    }).start();
  }

  const testData = [
    buildTestData('Vicki', 'do you remember', require('assets/profilePic.jpg'), 1),
    buildTestData('Ricky', 'the 21st night of september Chow', require('assets/profilePic.jpg'), 2),
    buildTestData('Alex', 'soulja boy tellem', undefined, 3),
    buildTestData('Evan', 'nobody \n \n\npray for\n me if t\nhey n\no\n\n\n\n\n\nt \n there \n \n \n for me', require('assets/profilePic.jpg'), 4),
    buildTestData('Vivian', 'weeeeeeeeeeelll yea yea', require('assets/profilePic.jpg'), 5),
  ]

  const styles = StyleSheet.create({
    createHugButtonContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 80,
      // left: windowWidth - 250,
      left: 10,
      borderRadius: 50,
      height: 70,
      backgroundColor: mode == 'light' ? 'white': 'rgba(0,0,0,0.5)',
      color: mode == 'light' ? 'black': 'white',
      borderColor: mode == 'light' ? 'black' : 'white',
      borderWidth: 2,
    },
    createHugText: {
      fontSize: 50,
      color: mode == 'light' ? 'black': 'white',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: windowWidth / 4,
      marginLeft: windowWidth / 2.7,
    },
    background: {
      position: 'absolute',
    }
  })  

    return (
      <View style={{...AppStyles.navPageContainer}}>
          {/* background */}
          <Image
            source={gradient}
            style={[styles.background, { width: windowWidth + 1, height: windowHeight }]}
          />
          <View style={{ marginTop: 70 }}>
            <Button 
              title="create hug" 
              onPress={() => navigation.navigate('Create Hug', { page: 'createHug' })}
            />
            <Button
              title='launch page'
              onPress={() => navigation.navigate('Launch Page', { page: 'launchPage' })}
            />
            <Button
              title='welcome page'
              onPress={() => navigation.navigate('Welcome Page', { page: 'welcomePage' })}
            />

          {/* Light and Dark Mode Switch */}
          <View style={styles.switchContainer}>
            <Text style={{color: mode == 'light' ? 'black': 'white'}}>
              {mode == 'light' ? 'Light' : 'Dark'}
            </Text>
            <Switch
              onValueChange={handleToggleSwitch}
              value={isEnabled}
            />
          </View>

          {/* Hug Cards */}
          <TouchableWithoutFeedback
            onPress={() => dismissCreateButton()}
          >
            <ScrollView 
              contentContainerStyle={{alignItems: 'center'}}
              style={{marginBottom: 70,}}
            >
              {testData.map(hugData => (
                <HugCard 
                  key={hugData.hugId} 
                  navigation={navigation}
                  { ...hugData } 
                  mode={mode}
                />
              ))}
            </ScrollView>
          </TouchableWithoutFeedback>


          {/* Create Hug Button */}
          <TouchableWithoutFeedback
            onPressIn={handlePress}
          >
            <Animated.View style={[styles.createHugButtonContainer, {
              width:width
            }]}>
              <Text style={[styles.createHugText, {
                marginLeft: 17.5
              }]}>
                +
              </Text>
              <Animated.View opacity={fade}>
                <Text style={[styles.createHugText, {
                  marginTop: 18,
                  fontSize: 25
                }]}>
                  Create Hug
                </Text>
              </Animated.View>
              
            </Animated.View>
          </TouchableWithoutFeedback>


        </View>
      </View>
    )
}