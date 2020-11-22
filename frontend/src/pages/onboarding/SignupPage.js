import React, { useState } from 'react';
import { 
  StyleSheet,
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';

// TODO: Hide passwords
// TODO: Check for valid email
// TODO: Check if user already exists
// TODO: STRIP INPUTS

export default function SignupPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [mounted, setMounted] = useState(true);

  const submitHandler = async () => {
    // console.log(emailField, passwordField, passwordConfirmField);
    setSigningIn(true);
    // const [registered, newUser] = await SignupAPI.registerUser(emailField, passwordField);
    // console.log('30', newUser);
    // const createdInFS = await SignupAPI.createUserInCollection(newUser, emailField, passwordField);
    // if (registered && createdInFS) {
    //   setMounted(false);
    //   navigation.navigate('Name Page');
    // } else {
    //   setSigningIn(false);
    //   console.log(`There was an error signing in. Booleans: 
    //     ${registered} | ${createdInFS}`);
    // }
  }

  const checkLength = () => {
    if (passwordField.length < 6) {
      return false
    }
    return true;
  }

  const checkFilled = () => {
    return emailField !== '' && 
      passwordField !== '' && 
      passwordConfirmField !== '';
  }

  const passwordMatch = () => {
    return passwordField === passwordConfirmField;
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


        {
          !checkLength() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Your password must be at least 6 characters long!
            </Text>
          </View>
        }
        {
          !passwordMatch() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Passwords do not match!
            </Text>
          </View>
        }
        {
          !checkFilled() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Not all form fields are filled!
            </Text>
          </View>
        }
        {
          checkFilled() && passwordMatch() && 
          <LinkedButton
            text='SUBMIT'
            color='#FFC24A'
            onPress={() => submitHandler()}
          />
        }
        {
          signingIn &&
          <View style={styles.textContainer}>
            <Text style={styles.signingText}>
              Signing up...
            </Text>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  signingText: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});