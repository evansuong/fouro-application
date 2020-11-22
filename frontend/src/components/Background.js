import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
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
  console.log('ey')
  
  useEffect(() => {
    console.log(page)
    if (page === 'Friends') {
      shiftBackground(0)
    } else if (page === 'Home') {
      shiftBackground(-100)
    } else {
      shiftBackground(-200)
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
      width: windowHeight,
    },
  })
  
  // expand animation definition
  function shiftBackground(x) {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(backgroundState, {
      toValue: x,
      duration: 500,
      useNativeDriver: false,
    }).start();
    
  }
  
  return (
    <Animated.View style={{ ...styles.container, left: backgroundState }}>
      <LinearGradient
        colors={['rgba(240,240,0,0.8)', 'rgba(255,80,0,1)']}
        style={styles.linearGradient}
        start={[.2, .7]}
        end={[1, .4]}
      />
    </Animated.View>
  );
}



