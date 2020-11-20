import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomTextField from 'components/CustomTextField';
import LinkedButton from 'components/LinkedButton';
import UsersAPI from 'backend/routes/Users';


export default function NamePage({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const checkFilled = () => {
    return firstName !== '' && 
      lastName !== '' &&
      username !== '';
  }

  const submitHandler = async () => {
    await UsersAPI.updateUserProfile(username, firstName, lastName);
    navigation.navigate('Pic Upload Page');
  }

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
        />

        <CustomTextField 
          titleText='Last Name' 
          placeholder='Vader'
          setField={setLastName}
        />

        <CustomTextField 
          titleText='Username' 
          placeholder='Imposter'
          setField={setUsername}
        />

        {
          !checkFilled() &&
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>
              Not all form fields are filled!
            </Text>
          </View>
        }
        {
          checkFilled() &&
          <LinkedButton
            text='SUBMIT'
            color='#FFC24A'
            onPress={() => submitHandler()}
          />
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