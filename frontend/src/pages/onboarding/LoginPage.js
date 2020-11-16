import React, { useState } from 'react';
import { 
  StyleSheet,
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [results, setResults] = useState({ email: '', password: '' });

  const submitHandler = () => {
    console.log('test')
    console.log(emailField, passwordField);
    setResults({ email: {emailField}, password: {passwordField} });
    setTimeout(() => {
      navigation.navigate("Main Nav Page");
    }, 50)
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

        {/* TODO:  How to check input validity */}
        <LinkedButton
          navigation={navigation}
          link='Main Nav Page'
          text='SUBMIT'
          color='#FB7250'
          onPress={() => submitHandler()}
        />

        <Text style={{ marginTop: 40 }}>
          {/* Email: {results.email} Password: {results.password} */}
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