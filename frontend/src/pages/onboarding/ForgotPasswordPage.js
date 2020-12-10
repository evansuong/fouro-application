import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Animated,
  Alert
} from 'react-native';
// APIs
import { UpdateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';



export default function ForgotPasswordPage({ navigation }) {
  // States
  const [emailField, setEmailField] = useState('');
  const [startUp, setStartUp] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
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

  const submitHandler = async () => {
    const { status, data } = 
      await UpdateAPI.forgotPassword({ request: emailField });
    if (status) {
      Alert.alert(`Reset password link sent to ${emailField}`);
    } else {
      Alert.alert('Something went wrong when sending the reset link');
    }
  }

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const checkFilled = () => {
    return emailField !== '';
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
          <View style={styles.whiteBox}>
            <CustomTextField 
              titleText='Email' 
              placeholder='e.g., abc123@gmail.com'
              setField={setEmailField}
              required={true}
            />

            {
              checkFilled() && 
              <View style={{marginTop: 10,}}>
                <LinkedButton
                  text='SEND RESET LINK'
                  color='#FB7250'
                  onPress={() => submitHandler()}
                />
              </View>
            }
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}