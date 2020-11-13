import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AppStyles from '../AppStyles'

export default function CustomTextField({ titleText, placeholder, setField }) {
  return (
    <View>
      <Text style={AppStyles.onboardingText}>
        {titleText}
      </Text> 
      <TextInput 
        style={AppStyles.onboardingInput}
        placeholder={placeholder}
        onChangeText={(val) => setField(val)}
      />
    </View>
  );
}