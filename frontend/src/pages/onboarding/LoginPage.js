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
import UsersAPI from 'backend/routes/Users';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [error, setError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const submitHandler = async () => {
    setLoggingIn(true);
    const signedin = await UsersAPI.signInAuthUser(emailField, passwordField);
    if (signedin) {
      navigation.navigate('Main Nav Page')
    } else {
      setError(true);
    }
  }

  const checkFilled = () => {
    return emailField !== '' && 
      passwordField !== '';
  }

  const timeout = () => {
    setTimeout(() => {
      setError(false);
    }, 10000);
    return true;
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

        {
          !checkFilled() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Not all form fields are filled!
            </Text>
          </View>
        }
        {
          checkFilled() && 
          <LinkedButton
            text='SUBMIT'
            color='#FB7250'
            onPress={() => submitHandler()}
          />
        }
        {
          error && timeout() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              There is no user profile with those credentials!
            </Text>
          </View>
        }
        {
          loggingIn &&
          <View style={styles.textContainer}>
            <Text style={styles.loggingText}>
              Logging in...
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
  },
  loggingText: {
    color: 'green',
    fontSize: 18,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  }
});