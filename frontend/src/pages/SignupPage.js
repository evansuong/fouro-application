import React, { useState } from 'react';
import { 
  StyleSheet,
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import CustomTextField from '../components/customTextField';
import LinkedButton from '../components/linkedButton';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [results, setResults] = useState('Email:   |   Password:   |   Password Confirmation: ');

  const submitHandler = () => {
    console.log(emailField, passwordField, passwordConfirmField);
    setResults(`Email: ${emailField}   |   Password: ${passwordField}   |   Password Confirmation: ${passwordConfirmField}`);
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <CustomTextField 
          titleText='Email' 
          placeholder='eg rikhilna@ucsd.edu'
          setField={setEmailField}
        />

        <CustomTextField
          titleText='Password'
          placeholder='eg password'
          setField={setPasswordField}
        />

        <CustomTextField
          titleText='Password Confirmation'
          placeholder='eg password'
          setField={setPasswordConfirmField}
        />

        <LinkedButton
          navigation={navigation}
          onPress={() => submitHandler()} 
          link='Profile Setup Page'
          text='SUBMIT'
        />

        <Text style={{ marginTop: 40 }}>{results}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});