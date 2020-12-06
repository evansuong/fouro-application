import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AppStyles from '../AppStyles'


// TODO: BROKEN. Check components that use this one to view comments.

/**
 * A text field to handle user input
 * @param {string} titleText The title of the text field
 * @param {string} placeholder The input placeholder
 * @param {stateHook} setField The field to set in the parent component
 */
export default function CustomTextField({ titleText, placeholder, setField, secureText=false, required=false, multiline=false }) {
  return (
    <View>
      <Text style={styles.onboardingText}>
        {titleText}
        { 
        required && 
        <Text style={styles.required}>
          *
        </Text>
        }
      </Text> 
      <TextInput 
        style={styles.onboardingInput}
        multiline={multiline}
        placeholder={placeholder}
        secureTextEntry={secureText}
        onChangeText={(val) => setField(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingText: {
    fontSize: 15,
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 25,
    fontFamily: 'Montserrat_400Regular'
  },
  required: {
    fontSize: 15,
    color: 'red',
    fontFamily: 'Montserrat_400Regular'
  },
  onboardingInput: {
    marginRight: 20,
    marginLeft: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});
