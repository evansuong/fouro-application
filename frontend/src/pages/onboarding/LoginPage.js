import React, { useState } from 'react';
import { 
  StyleSheet,
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import CustomTextField from 'components/customTextField';
import LinkedButton from 'components/linkedButton';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [results, setResults] = useState({ email: '', password: '' });

  const submitHandler = () => {
    console.log('test')
    console.log(emailField, passwordField);
    setResults({ email: {emailField}, password: {passwordField} });
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

        <LinkedButton
          navigation={navigation}
          onPress={() => submitHandler()} 
          link='Profile Setup Page'
          text='SUBMIT'
        />

        <Text style={{ marginTop: 40 }}>
          Email: {results.email} Password: {results.password}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});