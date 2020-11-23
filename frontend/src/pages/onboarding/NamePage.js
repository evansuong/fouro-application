import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
// import UsersAPI from 'backend/routes/Users';
// import { useIsFocused } from '@react-navigation/native';


export default function NamePage({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      setMounted(false);
    }
  }, []);

  const checkFilled = () => {
    return firstName !== '' && 
      lastName !== '' &&
      username !== '';
  }

  const submitHandler = async () => {
    // const usernameTaken = await UsersAPI.usernameTaken(username);
    // if (usernameTaken) {
    //   setUserExists(true);
    //   timeout();
    //   return;
    // }
    // await UsersAPI.updateUserProfile(username, firstName, lastName);
    navigation.navigate('Pic Upload Page');
  }

  const timeout = () => {
    if (mounted) {
      setTimeout(() => {
        setUserExists(false);
      }, 5000);
      return true;
    }
  }

  const isFocused = useIsFocused();

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <View>
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
              That username is taken!
            </Text>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  }
});