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

export default function SignupPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [formStatus, setFormStatus] = useState(false);

  const submitHandler = () => {
    console.log(emailField, passwordField, passwordConfirmField);
  }

  const checkLength = () => {
    if (passwordField.length < 6 || passwordConfirmField.length < 6) {
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
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>
              Your password must be at least 6 characters long!
            </Text>
          </View>
        }
        {
          !passwordMatch() &&
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>
              Passwords do not match!
            </Text>
          </View>
        }
        {
          !checkFilled() &&
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>
              Not all form fields are filled!
            </Text>
          </View>
        }
        {
          checkFilled() && passwordMatch() && 
          <LinkedButton
            navigation={navigation}
            link='Name Page'
            text='SUBMIT'
            color='#FFC24A'
            onPress={() => submitHandler()}
            formStatus={formStatus} 
          />
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
  errorTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  }
});