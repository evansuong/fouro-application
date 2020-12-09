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
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// APIs
import AuthAPI from '../../authentication/Authentication';
// Contexts
import { UserContext } from '../../contexts/UserContext';
import { DimensionContext } from '../../contexts/DimensionContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// Images
import BackgroundImg from 'assets/gradients/middle.png';
import Header from '../../components/Header';


export default function SignupPage({ navigation, route }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmField, setPasswordConfirmField] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { dispatch } = useContext(UserContext);
  // Misc
  const routeName = route.name;
  const isFocused = useIsFocused();
  const fade = useRef(new Animated.Value(0)).current;
  const validEmailSuffixes = ['com', 'gov', 'edu', 'net', 'org'];

  useEffect(() => {
    if (startUp) {
      setStartUp(false);
      fadeIn();
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
      setSigningUp(false);
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
    setSigningUp(true);
    const emailFieldTrim = emailField.trim();
    const passwordFieldTrim = passwordField.trim();
    const passwordConfirmFieldTrim = passwordConfirmField.trim();
    console.log(emailFieldTrim, passwordFieldTrim, passwordConfirmFieldTrim);
    
    let { status, data } = 
      await AuthAPI.registerUser(emailField.trim(), passwordField.trim());
    // console.log(data, status);
    if (status) {
      processSignupResponse(data, status);
    } else {
      setSigningUp(false);
      Alert.alert('Error. Maybe a user with that email already exists?');
      console.log(data);
    }
  }

  const processSignupResponse = (data, status) => {
    if (status) {
      setMounted(false);
      dispatch({
        type: "SET_UID",
        payload: data,
      });
      setTimeout(() => {
        navigation.replace('Name Page');
      }, 500);
    } else {
      setSigningUp(false);
      alert(data);
    }
  }

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
      marginTop: 20,
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
      fontSize: 40,
      fontFamily: 'Montserrat_500Medium'
    },
    whiteBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 20,
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
      <Header navigation={navigation} routeName={routeName} onMainNav={false} />

        <ImageBackground source={BackgroundImg} style={styles.backgroundImg}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Welcome</Text>
          </View>
          <View style={styles.whiteBox}>
            <CustomTextField 
              titleText='Email' 
              placeholder='e.g., abc123@gmail.com'
              setField={setEmailField}
              required={true}
            />

            <CustomTextField
              titleText='Password'
              placeholder='Password'
              setField={setPasswordField}
              secureText={true}
              required={true}
            />

            <CustomTextField
              titleText='Password Confirmation'
              placeholder='Password'
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
              !signingUp &&
              <View style={{marginTop: 20,}}>
                <LinkedButton
                  text='NEXT'
                  color='#FFC24A'
                  onPress={() => submitHandler()}
                />
              </View>
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
                  Gathering Data...
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