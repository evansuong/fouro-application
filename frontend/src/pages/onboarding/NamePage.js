import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  Keyboard,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// APIs
import { CreateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from '../../contexts/UserContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';


export default function NamePage({ navigation, route }) {
  // States
  const [firstName, setFirstName] = useState('V');
  const [lastName, setLastName] = useState('V');
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [signingUp, setSigningUp] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  // Misc
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
      setSigningUp(false);
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  }, []);

  const checkFilled = () => {
    return firstName !== '' && 
      lastName !== '' &&
      username !== '';
  }

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const submitHandler = async () => {
    setSigningUp(true);
    let userToCreate = {
      uid: userData.uid,
      username: username.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    }

    let { status, data } = 
      await CreateAPI.createUser(userData.uid, userToCreate);
    if (status && data.out) {
      setTimeout(() => {
        navigation.replace('Pic Upload Page');
      }, 1000);
    } else {
      setSigningUp(false);
      alert('That username is taken!');
      console.log(data);
    }
  }


  const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 18,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    whiteBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: isKeyboardVisible ? windowHeight / 3 : 0,
    },
    backgroundImg: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    signingText: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
    },
  });


  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <Animated.View opacity={fade} style={{flex: 1,}}>
        <ImageBackground
          source={BackgroundImg}
          style={styles.backgroundImg}
        >
          <View style={styles.whiteBox}>
            <CustomTextField 
              titleText='First Name' 
              placeholder='Darth'
              setField={setFirstName}
              required={true}
            />

            <CustomTextField 
              titleText='Last Name' 
              placeholder='Vader'
              setField={setLastName}
              required={true}
            />

            <CustomTextField 
              titleText='Username' 
              placeholder='Imposter'
              setField={setUsername}
              required={true}
            />

            {
              checkFilled() &&
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
                  That username is taken!
                </Text>
              </View>
            }
            {
              signingUp &&
              <View style={styles.textContainer}>
                <Text style={styles.signingText}>
                  SSN Retrieved...
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