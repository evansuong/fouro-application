import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Alert
} from 'react-native';
// APIs
import AuthAPI from '../../authentication/Authentication';
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';
import Header from 'components/Header'


export default function LoginPage({ navigation, route }) {
  // States
  const [emailField, setEmailField] = useState('rikhilna@gmail.com');
  const [passwordField, setPasswordField] = useState('gggggg');
  const [loggingIn, setLoggingIn] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData, dispatch } = useContext(UserContext)
  const fade = useRef(new Animated.Value(0)).current;
  const routeName = route.name;

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
    let response = 
      await AuthAPI.loginUser(emailField.trim(), passwordField.trim())
    processLoginResponse(response);
  }

  const forgotPasswordRedirect = () => {
    navigation.navigate('Forgot Password');
  }

  const processLoginResponse = async (response) => {
    if (response.status) {
      const { status, data } = await ReadAPI.getUserProfile(response.data);
      console.log('processed', status, data);
      if (status) {
        dispatch({
          type: "SET_USER_DATA",
          payload: Object.assign({}, {...data, streakCount: 3, hugCount: 4}),
        });
        dispatch({
          type: 'SET_UID',
          payload: response.data,
        })
        navigation.navigate('Main Nav Page', { loggedIn: true });
      } else {
        Alert.alert('An error occurred');
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
    },
    forgotPasswordContainer: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }, 
    forgotPasswordText: {
      color: 'red',
      fontFamily: 'Montserrat_400Regular',
    }
  });

  if (userData.uid) {
    return (
      <>
        <Header 
          navigation={navigation} 
          routeName={routeName} 
          onMainNav={false}
        />
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
      </>
    )
  } else {
    return (
      <>
        <Header 
          navigation={navigation} 
          routeName={routeName} 
          onMainNav={false}
        />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  checkFilled() && 
                  <LinkedButton
                    text='LOGIN'
                    color='#FB7250'
                    onPress={() => submitHandler()}
                  />
                }

                <TouchableOpacity
                  onPress={() => forgotPasswordRedirect()}
                >
                  <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password
                    </Text>
                  </View>
                </TouchableOpacity>
                
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
      </>
    );
  }
}