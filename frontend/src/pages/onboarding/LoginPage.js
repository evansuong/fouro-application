import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
  Animated
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
import AuthAPI from '../../authentication/Authentication';
import BackgroundImg from 'assets/gradients/middle.png';
import { DimensionContext } from '../../contexts/DimensionContext';


export default function LoginPage({ navigation }) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [error, setError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [startUp, setStartUp] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {windowWidth, windowHeight} = useContext(DimensionContext);
  const fade = useRef(new Animated.Value(0)).current;

  // const { user } = useContext(User)

  useEffect(() => {
    if (!startUp) {
      setStartUp(true);
      fadeIn();
    }
    if (!isFocused) {
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
  }, []);

  const isFocused = useIsFocused();

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const submitHandler = async () => {
    setLoggingIn(true);
    const signedinJSON = 
      await AuthAPI.loginUser(emailField.trim(), passwordField.trim());
    const user = signedinJSON.providerData[0];
    if (user) {
      setMounted(false);
      navigation.navigate('Main Nav Page', { loggedIn: true });
    } else {
      setError(true);
      setLoggingIn(false);
    }
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    whiteBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: isKeyboardVisible ? windowHeight / 4 : 0,
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
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <Animated.View opacity={fade} style={styles.container}>
        <ImageBackground
          source={BackgroundImg}
          style={styles.backgroundImage}
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Welcome Back</Text>
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

            {
              // checkFilled() && 
              <LinkedButton
                text='LOGIN'
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
                <ActivityIndicator />
              </View>
            }
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}