import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  Alert,
  Animated,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native';
// Expo Imports
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
// APIs
import { ReadAPI, UpdateAPI } from '../../API';
// Contexts
import { UserContext } from 'contexts/UserContext';
// Custom Components
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';


export default function ProfileSetupPage({ navigation, route }) {
  // States
  const [uploadPic, setUploadPic] = useState({});
  const [startUp, setStartUp] = useState(true);
  const [uploading, setUploading] = useState(false);
  // Context
  const { userData, dispatch } = useContext(UserContext);
  // Misc
  const fade = useRef(new Animated.Value(0)).current;
  const routeName = route.name;
  const validExtensions = ['jpeg', 'jpg', 'png'];
  const MAX_UPLOAD_SIZE = 100000;
  const LARGE_IMAGE_THRESHOLD = 1500000;
  let WIDTH_FACTOR = 0.4;

  useEffect(() => {
    if (startUp) {
      setStartUp(false);
      fadeIn();
    }
  }, [startUp])

  const callBackend = async () => {
    setUploading(true);
    let base64 = uploadPic.base64;
    if (base64.length > MAX_UPLOAD_SIZE) {
      const compressFactor = MAX_UPLOAD_SIZE / base64.length;
      base64 = await getBase64WithImage();
    }
    const request = {
      blob: base64
    }
    const { status, data } = 
      await UpdateAPI.uploadUserProfilePicture(
        userData.uid, request
      );
    if (!status) {
      Alert.alert('An error occurred. The image might have been too big!');
      setUploading(false);
    } else {
      await dispatchUser();
      navigation.replace('Welcome Page');
    }
  }

  const dispatchUser = async () => {
    const { status, data } = 
        await ReadAPI.getUserProfile(userData.uid);
    if (status) {
      dispatch({
        type: 'SET_USER_DATA',
        payload: Object.assign({}, {...data, streakCount: 0, hugCount: 0})
      })
    } else {
      Alert.alert('Error retrieving profile data');
    }
  }

  const getBase64WithImage = async () => {
    let compressFactor = 0.9;
    if (uploadPic.base64.length > LARGE_IMAGE_THRESHOLD) {
      compressFactor = 0.4;
      WIDTH_FACTOR = 0.3;
    }
    console.log('PicUpload b4 Compress', uploadPic.base64.length);
    const manipResult = await ImageManipulator.manipulateAsync(
      uploadPic.uri,
      [{resize: { 
        width: uploadPic.width * WIDTH_FACTOR,
        height: uploadPic.height * WIDTH_FACTOR, 
      }}],
      {
        compress: compressFactor,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true
      }
    )
    console.log('PicUpload after Compress', manipResult.base64.length);
    return `data:image/jpeg;base64,${manipResult.base64}`;
  }

  const checkUpload = (data) => {
    const arr = data.uri.split('.');
    const fileExtension = arr[arr.length - 1];
    const validExtension = validExtensions.includes(fileExtension);
    if (!validExtension) {
      Alert.alert(`Accepted image types are ${validExtensions}`);
    } else if (data.cancelled == false) {
      setUploadPic(data);
    } else if (data.cancelled) {
      Alert.alert('Image upload cancelled');
    }
  }

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
        base64: true
      })
      await checkUpload(data); 
    } else {
      Alert.alert('You need to give up permission to work'); 
    }     
  }

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
        base64: true
      })
      await checkUpload(data); 
    } else {
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

      {/* Gradient Background */}
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundImg}
      >
        {/* White Box Background */}
        <View style={styles.whiteBox}>
          {/* Profile Picture Holder */}
          <View style={styles.picContainer}>
            <Image
              source={isEmpty(uploadPic) || uploadPic.cancelled ? 
                fillerProfilePic : {uri: `${uploadPic.uri}`}
              }
              style={styles.profilePicture}
            />
          </View>

          {/* Choose a Profile Picture Button */}
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

          {/* Conditional Submit */}
          { 
            uploadedPic() && 
            !uploading &&
            <View style={styles.submit}>
              <LinkedButton
                text='COMPLETE'
                color='#FFC24A'
                onPress={() => callBackend()}
              />
            </View>
          }
          {
            uploading &&
            <View style={styles.textContainer}>
              <ActivityIndicator />
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
    backgroundColor: '#ccc7c6',
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
  },
  note: {
    color: 'red', 
    fontSize: 10, 
    marginTop: 10, 
    width: 200, 
    textAlign: 'center'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
})