import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import AppStyles from '../AppStyles';


// TODO: Fix hitbox with TouchableOpacity (hitbox is too large
// and not representative of the button's size)

export default function LinkedButton({ navigation, link, text }) {
  // TODO: Later
  // const linkedButtonContainer = {}

  return (
    <TouchableOpacity onPress={() => navigation.navigate(`${link}`)}>
      <View style={styles.linkedButtonContainer}>
          <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkedButtonContainer: {
    backgroundColor: '#FB7250',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 100,
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  }
})