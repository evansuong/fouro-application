import React, { useState, useEffect, } from 'react';
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
// import SignupAPI from 'backend/routes/SignUp';
// import UsersAPI from 'backend/routes/Users';
// import { useIsFocused } from '@react-navigation/native';


export default function SignupPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setMounted(false);
    }
  }, [])

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

  const validEmailSuffixes = ['com', 'gov', 'edu', 'net', 'org'];

  const isFocused = useIsFocused();

  const checkLength = () => {
    if (passwordField.length < 6) {
      return false
    }
    return true;
  }

  const checkEmailValid = () => {
    let topLevelDomain;
    const dotNum = (emailField.match(/\./g) || []).length;
    if (dotNum == 1) {
      topLevelDomain = emailField.split('.')[1];
    }
    return emailField.includes('@') && 
      emailField.includes('.') &&
      emailField.slice(-1) !== '.' && 
      (emailField.match(/\@/g) || []).length == 1 &&
      validEmailSuffixes.includes(topLevelDomain);
  }

  const checkEmailFilled = () => {
    return emailField !== '' && emailField.length >= 5;
  }

  const checkPasswordFilled = () => {
    return passwordField !== '' && 
      passwordConfirmField !== '';
  }

  const passwordMatch = () => {
    return passwordField === passwordConfirmField;
  }

  const timeout = () => {
    if (mounted) {
      setTimeout(() => {
        setUserExists(false);
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

        <CustomTextField
          titleText='Password Confirmation'
          placeholder='eg password'
          setField={setPasswordConfirmField}
          secureText={true}
          required={true}
        />


        {
          checkPasswordFilled() &&
          !checkLength() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Your password must be at least 6 characters long!
            </Text>
          </View>
        }
        {
          checkEmailFilled() && 
          !checkEmailValid() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Email is badly formatted!
            </Text>
          </View>
        }
        {
          checkPasswordFilled() &&
          !passwordMatch() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Passwords do not match!
            </Text>
          </View>
        }
        {  
          checkEmailFilled() &&
          checkPasswordFilled() && 
          checkEmailValid() &&
          passwordMatch() && 
          checkLength() &&
          <LinkedButton
            text='SUBMIT'
            color='#FFC24A'
            onPress={() => submitHandler()}
          />
        }
        {
          userExists &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              There already exists a user with that email!
            </Text>
          </View>
        }
        {
          signingUp &&
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