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
// APIs
import AuthAPI from '../../authentication/Authentication';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';
import { ReadAPI } from '../../API';



export default function LoginPage({ navigation }) {
    // States
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData, dispatch } = useContext(UserContext)
  const fade = useRef(new Animated.Value(0)).current;

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
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  }, []);

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const submitHandler = async () => {
    setLoggingIn(true);
    let response = await AuthAPI.loginUser(emailField.trim(), passwordField.trim())
    processLoginResponse(response)
  }

  const processLoginResponse = async (response) => {
    if (response.status) {
      const { status, data } = await ReadAPI.getUserProfile(userData.uid);
      if (status) {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
        navigation.navigate('Main Nav Page', { loggedIn: true });
      } else {
        Alert.alert('An error occurred');
        console.log(data);
      }
    } else {
      setLoggingIn(false);
      alert("No users found with those credentials")
    }
  }

  const checkFilled = () => {
    return emailField !== '' && 
      passwordField !== '';
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
      width: windowWidth,
    },
    titleText: {
      marginBottom: 40,
      fontSize: 40,
      fontFamily: 'Montserrat_500Medium',
      textAlign: 'center',
    }
  });

  if (false) { //userData.currentUser.uid) {
    return (
      <Animated.View opacity={fade} style={styles.container}>
        <ImageBackground
          source={BackgroundImg}
          style={styles.backgroundImage}
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>
              You're already logged in!
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    )
  } else {
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
              <Text style={styles.titleText}>
                Welcome Back
              </Text>
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

              {
                // checkFilled() && 
                <LinkedButton
                  text='LOGIN'
                  color='#FB7250'
                  onPress={() => submitHandler()}
                />
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
}