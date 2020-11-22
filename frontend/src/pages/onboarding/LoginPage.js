import React, { useState, useEffect, } from 'react';
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
// import LoginAPI from 'backend/model/account/LogIn';
import { useIsFocused } from '@react-navigation/native';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [error, setError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      setMounted(false);
    }
  }, []);

  const isFocused = useIsFocused();

  const submitHandler = async () => {
    // setLoggingIn(true);
    // const signedin = await LoginAPI.loginUser(emailField, passwordField);
    // if (signedin) {
    //   setMounted(false);
    //   navigation.navigate('Main Nav Page');
    // } else {
    //   setError(true);
    //   setLoggingIn(false);
    // }
  }

  const checkFilled = () => {
    return emailField !== '' && 
      passwordField !== '';
  }

  const timeout = () => {
    if (mounted) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      return true;
    }
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
          required={true}
        />

        <CustomTextField
          titleText='Password'
          placeholder='eg password'
          setField={setPasswordField}
          secureText={true}
          required={true}
        />

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