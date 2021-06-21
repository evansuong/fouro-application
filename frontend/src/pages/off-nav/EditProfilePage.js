import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
// Expo Imports
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
// APIs
import { ReadAPI, UpdateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from "components/CustomTextField";
import Header from "components/Header"
import PicUploadButton from 'components/PicUploadButton';
// Images/Assets
import fillerProfilePic from 'assets/fillerProfilePic.jpg';


export default function EditProfilePage({ navigation, route }) {
  // States
  const [fetchedUser, setFetchedUser] = useState();
  const [uploadPic, setUploadPic] = useState();
  const [profilePic, setProfilePic] = useState();
  const [uploading, setUploading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData, dispatch } = useContext(UserContext);
  // Misc
  const buttonMargin = 10;
  const buttonHeight = 50;
  const topMarginSize = windowWidth * 0.1 + 5;
  const routeName = route.name;
  const validExtensions = ['jpeg', 'jpg', 'png'];
  const MAX_UPLOAD_SIZE = 100000;
  const LARGE_IMAGE_THRESHOLD = 1500000;
  let WIDTH_FACTOR = 0.4;

  // TODO: use useEffect to init the fields with current user info
  useEffect(() => {
    fetchUserData();
  }, [])

  function firstNameEmpty() {
    return firstName === "";
  }

  function lastNameEmpty() {                                 
    return lastName === "";
  }

  function usernameEmpty() {
    return username === "";
  }

  function fieldsValid() {
    return !firstNameEmpty() && 
    !lastNameEmpty() &&
    !usernameEmpty()
  }

  const fetchUserData = async () => {
    const { status, data } = 
      await ReadAPI.getUserProfile(userData.uid);
    if (status) {
      console.log('EditProfile 78', data);
      setFetchedUser(data);
      const [ userFirstName, userLastName ] = data.name.split(" ");
      setFirstName(userFirstName);
      setLastName(userLastName);
      setUsername(data.username);
      setProfilePic(data.profile_pic);
    } else {
      Alert.alert('Something went wrong when fetching user data');
    }
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

  const getBase64WithImage = async () => {
    let compressFactor = 0.9;
    if (uploadPic.base64.length > LARGE_IMAGE_THRESHOLD) {
      compressFactor = 0.3;
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

  const edit = async () => {
    if (uploadPic) {
      await sendImageToBase();
    }
    await sendProfileToBase();
    Alert.alert('Profile Updated!');
    navigation.navigate('Main Nav Page');
  }

  function verifyUserInputs() {
    // TODO: verify alphanumeric chars for username
  }

  const sendImageToBase = async () => {
    setUploading(true);
    let base64 = uploadPic.base64;
    if (base64.length > MAX_UPLOAD_SIZE) {
      const compressFactor = MAX_UPLOAD_SIZE / base64.length;
      base64 = await getBase64WithImage();
    }
    const picRequest = {
      blob: base64
    }
    const { status, data } = 
      await UpdateAPI.uploadUserProfilePicture(
        userData.uid, picRequest
      );
    if (!status) {
      Alert.alert('An error occurred. The image might have been too big!');
      setUploading(false);
    } else {
      console.log('EditProfile 187 Image Uploaded');
    }
  }

  const sendProfileToBase = async () => {
    console.log('EditProfile 194', username, firstName, lastName);
    const request = {
      username: username,
      firstName: firstName,
      lastName: lastName
    }
    const { status, data } = 
      await UpdateAPI.updateUserProfile(userData.uid, request);
    if(!status) {
      Alert.alert("Something went wrong while updating profile.")
    }
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: fieldsValid() ? 'orange' : 'gray',
      height: buttonHeight,
      width: windowWidth - buttonMargin,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      margin: buttonMargin,
      marginBottom: windowWidth * 0.1,
    },
    buttonText: {
      color: "white",
      fontSize: windowWidth * 0.05,
      fontWeight: "bold",
    },
    header: {
      marginTop: topMarginSize,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    warning: {
      color: 'red'
    },
    formContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    loadingContainer: {
      flex: 1, 
      resizeMode: 'cover', 
      justifyContent: 'center'
    },
    profilePicContainer: {
      display: 'flex',
      alignItems: 'center',
      width: windowWidth,
      marginTop: 20,
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: windowWidth * 0.2,
    },
    uploadButtons: {
      display: 'flex',
      flexDirection: 'row',
    }
  });

  if (!fetchedUser || !profilePic) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large'/>
      </View>
    )
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.formContainer}>
          
          <Header 
            routeName={routeName} 
            navigation={navigation} 
            onMainNav={false} 
          />

          <View style={{ width: '100%' }}>
            <Text style={styles.header}>
              Edit Profile
            </Text>
            <View style={styles.profilePicContainer}>
              <Image
                source={!uploadPic || uploadPic.cancelled ? 
                  {uri: profilePic} : {uri: `${uploadPic.uri}`}
                }
                style={styles.profilePicture}
              />

              <View style={styles.uploadButtons}>
                <View style={{marginRight: 10,}}>
                  <PicUploadButton
                    text='Choose a profile picture'
                    onPress={() => pickFromGallery()}
                    width={windowWidth * 0.3}
                    height={windowWidth * 0.2}
                  />
                </View>
                <View style={{marginLeft: 10,}}>
                  <PicUploadButton
                    text='Take a profile picture'
                    onPress={() => pickFromCamera()}
                    width={windowWidth * 0.3}
                    height={windowWidth * 0.2}
                  />
                </View>
              </View>
            </View>
            <View>
            {/* Old Password Input Field */}
            <CustomTextField
              titleText="First Name"
              setField={setFirstName}
              defaultValue={firstName}
              required={true}
            />
            {/* New Password Input Field */}
            <CustomTextField
              titleText="Last Name"
              setField={setLastName}
              defaultValue={lastName}
              required={true}
            />
            {/* New Password Confirmation Input Field */}
            <CustomTextField
              titleText="Username"
              setField={setUsername}
              defaultValue={username}
              required={true}
            />
            </View>
            {/* Error Messages */}
            <View style={{ marginLeft: 20 }}>
              {
                firstNameEmpty() && 
                <Text style={styles.warning}>
                  First name must not be empty.
                </Text>
              }
              {
                lastNameEmpty() && 
                <Text style={styles.warning}>
                  Last name must not be empty.
                </Text>
              }
              {
                usernameEmpty() && 
                <Text style={styles.warning}>
                  Username must not be empty.
                </Text>
              }
            </View>            
          </View>
          

          {/* Confirmation/Edit Button */}
          {
            !uploading && 
            <TouchableOpacity
              style={styles.button}
              disabled={!fieldsValid()}
              onPress={() => edit()}
            >
              <Text style={styles.buttonText}>
                CHANGE
              </Text>
            </TouchableOpacity>
          }
          {
            uploading &&
            <View style={styles.textContainer}>
              <ActivityIndicator />
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
