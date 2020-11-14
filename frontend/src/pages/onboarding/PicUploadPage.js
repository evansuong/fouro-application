import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import fillerProfilePic from '../../../assets/fillerProfilePic.jpg';
import LinkedButton from 'components/linkedButton';


export default function ProfileSetupPage({ navigation }) {
  return (
    <View>
      <View style={styles.picContainer}>
        <Image
          source={fillerProfilePic}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Choose a profile picture
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Take a profile picture
          </Text>
        </View>
      </View>
      <View style={{marginTop: 30,}}>
        <LinkedButton
          navigation={navigation}
          link='Question Page'
          text='SUBMIT'
          // Should this be yellow or grey?
          color='#FFC24A'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  picContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 30
  },
  button: {
    display: 'flex',
    marginTop: 30,
    width: 175,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadows do not work on rgba values
    backgroundColor: '#ccc7c6',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.41,
    shadowRadius: 7,
    elevation: 10,  
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  }
})