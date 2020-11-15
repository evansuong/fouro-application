import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomTextField from 'components/customTextField';
import LinkedButton from 'components/linkedButton';


export default function NamePage({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

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

        {/* TODO:  How to check input validity */}
        <LinkedButton
          navigation={navigation}
          link='Pic Upload Page'
          text='SUBMIT'
          color='#FFC24A'
        />
      </View>
    </TouchableWithoutFeedback>
  );
}