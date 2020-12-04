import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
import { useIsFocused } from '@react-navigation/native';
import BackgroundImg from 'assets/gradients/middle.png';
import AuthAPI from '../../authentication/Authentication';
import { UserContext } from '../../contexts/UserContext';
import { DimensionContext } from '../../contexts/DimensionContext';


export default function SignupPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('gggggg');
  const [passwordConfirmField, setPasswordConfirmField] = useState('gggggg');
  // const [passwordField, setPasswordField] = useState('');
  // const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [startUp, setStartUp] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { dispatch } = useContext(UserContext);

  const isFocused = useIsFocused();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!startUp) {
      setStartUp(true);
      fadeIn();
    }
    if (!isFocused) {
      setSigningUp(false);
      setStartUp(false);
      setMounted(false);
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  }, [])

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const submitHandler = async () => {
    // console.log('loading');
    const response = await API.getUserProfile(emailField);
    console.log('response status: ', response.statusCode);
    // const post = await response.data;
    // console.log(post);

    const emailFieldTrim = emailField.trim();
    const passwordFieldTrim = passwordField.trim();
    const passwordConfirmFieldTrim = passwordConfirmField.trim();
    console.log(emailFieldTrim, passwordFieldTrim, passwordConfirmFieldTrim);
    setSigningUp(true);
    // check if user with that email already exists (waiting for backend)
    const checkUserResponse = await API.checkUserExists(emailField);

    const signUpData = {
      user: {
        email: emailFieldTrim,
        password: passwordFieldTrim,
      }
    }
    
    navigation.navigate('Name Page', { signUpData: signUpData.user });
  
  }

  

  const validEmailSuffixes = ['com', 'gov', 'edu', 'net', 'org'];

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

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    errorText: {
      color: 'red',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    signingText: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImg: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    titleTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth
    },
    titleText: {
      marginBottom: 40,
      fontSize: 50,
      fontFamily: 'EBGaramond_500Medium'
    },
    whiteBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: isKeyboardVisible ? windowHeight / 3 : 0,
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <Animated.View opacity={fade} style={styles.container}>
        <ImageBackground source={BackgroundImg} style={styles.backgroundImg}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Welcome</Text>
          </View>
          <View style={styles.whiteBox}>
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
                text='SIGN UP'
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
                <ActivityIndicator />
              </View>
            }
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}