import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default function PicUploadButton({ navigation, text, onPress }) {
  const [animatedValue, newAnimatedValue] = useState(new Animated.Value(1));

  function handlePressIn() {
    Animated.spring(animatedValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 10,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    display: 'flex',
    marginTop: 30,
    width: 175,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadows do not work on rgba values
    backgroundColor: '#ccc7c6',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.41,
    shadowRadius: 7,
    elevation: 10,  
  },
})