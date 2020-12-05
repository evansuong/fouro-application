import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { DimensionContext } from 'contexts/DimensionContext';

export default function PicUploadButton({ navigation, text, onPress }) {
  const [animatedValue, newAnimatedValue] = useState(new Animated.Value(1));
  const {windowWidth, windowHeight} = useContext(DimensionContext);

  function handlePressIn() {
    Animated.spring(animatedValue, {
      toValue: 0.95,
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

  const styles = StyleSheet.create({
    buttonText: {
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    button: {
      display: 'flex',
      marginTop: 20,
      width: windowWidth / 2.2,
      height: windowHeight / 10,
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
      shadowOpacity: 0.22,
      shadowRadius: 3,
      elevation: 10,  
    },
  })

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