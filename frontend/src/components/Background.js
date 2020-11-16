import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Make sure there are no backgroundColor attributes.
// They will overwrite this background.

/**
 * Used as a background for the home, notifications, and friends pages
 * @param {string} direction The direction in which the gradient should be 
 *                           oriented. Pick from [left, middle, right]
 */
export default function Background({ direction='middle' }) { //comment
  const directionMap = {
    'middle': {
      'start': [0.9, 0.18],
      'end': [0.9, 0.9]
    },
    'left': {
      'start': [0.9, 0.1],
      'end': [0.1, 0.6]
    },
    'right': {
      'start': [0.1, 0.1],
      'end': [0.9, 0.6]
    },
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(240,194,74,1)', 'rgba(255,80,0,1)']}
        start={[directionMap[`${direction}`].start[0], directionMap[`${direction}`].start[1]]}
        end={[directionMap[`${direction}`].end[0], directionMap[`${direction}`].end[1]]}
        style={styles.linearGradient}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 700,
  },
})
