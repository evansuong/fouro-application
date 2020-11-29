import React, { useState, } from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  Alert,
} from 'react-native';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import LinkedButton from 'components/LinkedButton';
import PicUploadButton from 'components/PicUploadButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const fetch = require('node-fetch');

export default function ProfileSetupPage({ navigation }) {
  const [uploadPic, setUploadPic] = useState({});

  const callBackend = async () => {
    console.log(uploadPic);
    const splitPicURI = uploadPic.uri.split('/');
    let res = await getBlobObj(uploadPic.uri, splitPicURI[splitPicURI.length - 1]);
    // Send res to backend to push to firebase
    // Refer to https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
    // console.log('success', JSON.stringify(res));
  }

  const getBlobObj = async (uri, imgName) => {
    const response = await fetch(uri);
    return await response.blob();
  }

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      console.log('granted');
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.5,
      })
      console.log(data);
      setUploadPic(data);
    } else {
      console.log('access denied');
      Alert.alert('You need to give up permission to work');
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      console.log('granted');
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.5,
      })
      console.log(data);
      setUploadPic(data);
    } else {
      console.log('access denied');
      Alert.alert('You need to give up permission to work');
    }
  }

  const isEmpty = (obj) => {
    return Object.keys(obj).length == 0;
  }
  
  return (
    <View>
      <View style={styles.picContainer}>
        <Image
          source={isEmpty(uploadPic) || uploadPic.cancelled ? fillerProfilePic : {uri: `${uploadPic.uri}`}}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PicUploadButton
          text='Choose a profile picture'
          onPress={() => pickFromGallery()}
        />
        <PicUploadButton
          text='Take a profile picture'
          onPress={() => pickFromCamera()}
        />
      </View>

      <View style={styles.submit}>
        <LinkedButton
          navigation={navigation}
          link='Welcome Page'
          text='SUBMIT'
          // Should this be yellow or grey?
          color='#FFC24A'
          onPress={() => callBackend()}
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
  },
  submit: {
    marginTop: 30,
  }
})