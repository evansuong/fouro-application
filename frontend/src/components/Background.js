import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Easing, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DimensionContext } from '../contexts/DimensionContext';

// Make sure there are no backgroundColor attributes.
// They will overwrite this background.

/**
 * Used as a background for the home, notifications, and friends pages
 * @param {string} direction The direction in which the gradient should be 
 *                           oriented. Pick from [left, middle, right]
 */
export default function Background({ page }) { //comment

  const { windowWidth, windowHeight } = useContext(DimensionContext)

  const backgroundState = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    console.log(page)
    if (page === 'Friends') {
      shiftBackground(-400)
    } else if (page === 'Home') {
      shiftBackground(-600)
    } else if (page === 'Notification') {
      shiftBackground(-950)
    }
  }, [page])

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    linearGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: windowHeight,
      width: windowHeight * 2,
    },
  })
  
  // expand animation definition
  function shiftBackground(x) {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(backgroundState, {
      toValue: x,
      duration: 2500,
      easing: Easing.inOut(Easing.sin),
      useNativeDriver: true,
    }).start();
  }
  
  return (
    <Animated.View style={{ ...styles.container, transform: [{ translateX: backgroundState }] }}>
      <LinearGradient
        colors={['#FB7250DD', '#FFC24ACC', '#FFC24ACC', '#FB7250DD']}
        style={styles.linearGradient}
        start={[.4, .2]}
        end={[.8, .8]}
      />
    </Animated.View>
  );
}



