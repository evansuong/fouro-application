import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
// Expo Imports
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// APIs
import { CreateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
import Header from 'components/Header';
// Images/Assets
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import profilePic from 'assets/profilePic.jpg';
import BackgroundImg from 'assets/gradients/middle.png';


// TODO: Remove FriendName and FriendPic parameters
export default function CreateHugPage({ navigation, route, friendName='Placeholder', friendPic }) {
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    const {windowWidth, windowHeight} = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
 
    const routeName = route.name;
    // const { friendData } = route.params.data;

    const callBackend = async () => {
      try {
        let base64Strings = [];
        for (let image of images) {
          const base64 = await getBase64WithImage(image);
          base64Strings.push(base64);
        }
        request = {
          // friendId: friendData.friend_id,
          message: message,
          blobs: base64Strings
        }
        // const response = await CreateAPI.createHug(userData.uid, request);
        const { status, data } = await CreateAPI.createHug('temp', request);
        console.log('data', data);
        Alert.alert('Hug created!');
        navigation.navigate('Home Page');
      } catch (err) {
        Alert.alert('Hug creation failed. Please try again.')
      }
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
        checkUpload(data); 
      } else {
        console.log('access denied');
        Alert.alert('You need to give permission to upload a picture!');
      }
    }

    const getBase64WithImage = async (uploadPic) => {
      const manipResult = await ImageManipulator.manipulateAsync(
        uploadPic.uri,
        [],
        {
          compress: 0.1,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true
        }
      )
      return `data:image/jpeg;base64,${manipResult}`;
    }
  
    const checkUpload = (data) => {
      const arr = data.uri.split('.');
      const fileExtension = arr[arr.length - 1];
      const validExtension = validExtensions.includes(fileExtension);
      if (!validExtension) {
        Alert.alert(`Accepted image types are ${validExtensions}`);
      } else if (images.length > 3) {
        Alert.alert('Max limit of uploads reached');
      } else if (data.cancelled) {
        Alert.alert('Image upload cancelled');
      } else if (data.cancelled == false) {
        setUploadPic(data);
      }
    }

    const isEmpty = (obj) => {
      return Object.keys(obj).length == 0;
    }

    const styles = StyleSheet.create({
      mainContainer: {
        overflow: 'hidden',
        height: windowHeight / 1.45,
      },
      profilePic: {
        width: windowWidth / 4,
        height: windowWidth / 4,
        borderRadius: 50,
        marginLeft: windowWidth / 14,
      },
      friendInfoContainer: {
        flexDirection: 'row',
        width: windowWidth,
        alignItems: 'center',
      },
      friendTextContainer: {
        alignItems: 'center',
        marginLeft: windowWidth / 18,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'black',
        width: windowWidth / 1.8,
      },
      friendText: {
        fontSize: 15,
      },
      picContainer: {
        width: windowWidth,
        height: windowHeight / 5,
        overflow: 'hidden',
        marginTop: windowHeight / 80,
      },
      backgroundImg: {
        height: windowHeight,
        resizeMode: 'cover',
      },
      header: {
        width: windowWidth,
        alignItems: 'center',
        marginTop: windowHeight / 16,
        marginBottom: windowHeight / 40
      },
      headerText: {
        fontSize: 25,
        fontFamily: 'Montserrat_600SemiBold',
        marginBottom: 10,
      },
      helperHeaderText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Montserrat_600SemiBold',
        width: windowWidth / 1.2
      }
    });

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('dismissed keyboard')
      }}>
        <View>
          <Header routeName={routeName} navigation={navigation} onMainNav={false}/>            
          <ImageBackground source={BackgroundImg} style={styles.backgroundImg}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Create Hug
              </Text>
              <Text style={styles.helperHeaderText}>
                Add a message and images so that you can save a memorable
                event with {friendName}
              </Text>
            </View>

            <View style={styles.mainContainer}>
              {/* Friend Info */}
              <View style={{alignItems: 'center',}}>
                <View style={styles.friendInfoContainer}>
                  <Image
                    source={friendPic ? friendPic : fillerProfilePic}
                    style={styles.profilePic}
                  />
                  <View style={styles.friendTextContainer}>
                    <Text style={styles.friendText}>
                      {friendName}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Message Input Box */}
              <View>
                <CustomTextField
                  titleText='Message'
                  placeholder='Insert Hug Message Here...'
                  setField={setMessage}
                  required={true}
                  multiline={true}
                />
              </View>

              {/* Upload Images Button */}
              <View style={{alignItems: 'center',}}>
                <PicUploadButton 
                  text='Attach Images'
                  onPress={() => pickFromGallery()}
                />
              </View>

              {/* Images Array */}
              <View style={styles.picContainer}>
                <ScrollView horizontal={true}>
                  <View onStartShouldSetResponder={() => true} style={{
                    flexDirection: 'row'
                  }}>
                  {images.map((item) => (
                    <Image
                      key={item.uri}
                      source={isEmpty(item) || item.cancelled ? profilePic : {uri: `${item.uri}`}}
                      style={{
                        width: windowWidth / 3, 
                        height: windowWidth / 3, 
                        marginTop: 10, 
                        marginLeft: 10,
                      }}
                    />
                  ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {
              images.length > 0 && message.length > 0 &&
              <View>
                <LinkedButton
                  navigation={navigation}
                  link='Main Nav Page'
                  text='SEND HUG'
                  color='#FB7250'
                  onPress={() => callBackend()}
                />
              </View>
            }
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
}
