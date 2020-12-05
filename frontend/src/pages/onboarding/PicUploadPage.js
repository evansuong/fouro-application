import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  Alert,
  Animated,
  ImageBackground
} from 'react-native';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import BackgroundImg from 'assets/gradients/middle.png';
import AuthAPI from '../../authentication/Authentication';
import { PutAPI } from '../../API';
import { UserContext } from '../../contexts/UserContext';
import { DimensionContext } from '../../contexts/DimensionContext';
import LinkedButton from 'components/LinkedButton';
import PicUploadButton from 'components/PicUploadButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

// const fs = require('fs');

const fetch = require('node-fetch');

export default function ProfileSetupPage({ navigation, route }) {
  const [uploadPic, setUploadPic] = useState({});
  const { userData, dispatch } = useContext(UserContext);
  const [startUp, setStartUp] = useState(true);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (startUp) {
      setStartUp(false);
      fadeIn();
    }
  }, [startUp])

  const callBackend = async () => {
    // function toDataURL(url, callback) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     var reader = new FileReader();
    //     reader.onloadend = function() {
    //       callback(reader.result);
    //     }
    //     reader.readAsDataURL(xhr.response);
    //   };
    //   xhr.open('GET', url);
    //   xhr.responseType = 'blob';
    //   xhr.send();
    // }
    
    // toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
    //   console.log(dataUrl)
    //   const request = {dataUrl: dataUrl}
    //   API.uploadUserProfilePicture('zE51j8mkbreXCT2QDevz4Daid5I2', request);
    // })

      // uploadUserProfilePicture
      console.log(uploadPic);
      // ImagePicker.showImagePicker
      const base64 = await FileSystem.readAsStringAsync(
        uploadPic.uri, { encoding: 'base64'}
      );
      console.log('base64: ', base64);
      // const readFileOut = fs.readFile(uploadPic.uri, 'base64');
      // const blob = Blob.build(readFileOut, { type: 'application/octet;BASE64'});

      // const splitPicURI = uploadPic.uri.split('/');
      console.log('uri: ', uploadPic.uri);
      const imgResponse = await fetch(uploadPic.uri);
      const blob =  await imgResponse.blob();
      console.log('blob: ', JSON.stringify(blob));

      
      // console.log(typeof blob);
      // console.log(blob.size);
      // console.log(blob.type);
      // console.log(blob.text());
      
      // let res = await getBlobObj(uploadPic.uri, splitPicURI[splitPicURI.length - 1]);
      // Send res to backend to push to firebase
      // Refer to https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
      // console.log('success', JSON.stringify(blob));
      // console.log('userData: ', userData);
      const request = {
        uid: userData.uid,
        blob: blob,
      }
      console.log('request: ', JSON.stringify(request));
      const pfpResponse = await PutAPI.uploadUserProfilePicture(request.uid, request);
      // navigation.navigate('Welcome Page');
   
  }

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      console.log('granted');
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.1,
        maxWidth: 512,
        maxHeight: 512,
      })
      // console.log(data);
      if (data.cancelled == false) {
        setUploadPic(data);
      }
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
        quality: 0.1,
        maxWidth: 512,
        maxHeight: 512,
      })
      // console.log(data);
      if (data.cancelled == false) {
        setUploadPic(data);
      }
    } else {
      console.log('access denied');
      Alert.alert('You need to give up permission to work');
    }
  }

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const uploadedPic = () => {
    return typeof uploadPic !== 'undefined' && 
      uploadPic &&
      uploadPic.cancelled == false
  }

  const isEmpty = (obj) => {
    return Object.keys(obj).length == 0;
  }
  
  return (
    <Animated.View opacity={fade} style={{flex: 1,}}>
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundImg}
      >
        <View style={styles.whiteBox}>
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

          { uploadedPic() && 
            <View style={styles.submit}>
              <LinkedButton
                text='SUBMIT'
                // Should this be yellow or grey?
                color='#FFC24A'
                onPress={() => callBackend()}
              />
            </View>
          }
        </View>
      </ImageBackground>
    </Animated.View>
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
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  whiteBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  }
})