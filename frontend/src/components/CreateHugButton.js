import React, { useState, useRef, useEffect, useContext } from 'react'
import { 
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

import { DimensionContext } from '../contexts/DimensionContext';

// TODO: Move create hug button to the right side of the screen.
// TODO: Fix button animation starting from far left of button

export default function HomePage({ navigation, expandState, left, bottom, inputMode }) {
  const {windowWidth, windowHeight} = useContext(DimensionContext);
  const [expanded, setExpanded] = useState(expandState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState(inputMode);

  const width = useRef(new Animated.Value(70)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const animationDuration = 150;

  useEffect(() => {
    console.log(mode);
    console.log(expanded);
  }, [expanded, mode])

  function handlePress() {
    setExpanded(!expanded);
    if (expanded) {
      navigation.navigate('Create Hug');
      collapse();
    } else {
      expand();
    }
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

  const styles = StyleSheet.create({
    createHugButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      // bottom: 10,
      bottom: bottom,
      // left: windowWidth - 250,
      // left: 10,
      left: left,
      borderRadius: 50,
      height: 70,
      backgroundColor: mode == 'light' ? 'rgba(255,255,255,0.5)': 'rgba(0,0,0,0.5)',
      color: mode == 'light' ? 'black': 'white',
    },
    createHugText: {
      fontSize: 50,
      color: mode == 'light' ? 'black': 'white',
    },
  })

  return (
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
  )
}