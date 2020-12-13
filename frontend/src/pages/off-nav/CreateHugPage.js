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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// Expo Imports
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// APIs
import { CreateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from 'components/CustomTextField';
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
import Header from 'components/Header';
// Images/Assets
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import profilePic from 'assets/profilePic.jpg';
import BackgroundImg from 'assets/gradients/middle.png';
import { TextInput } from 'react-native-paper';


// TODO: Remove FriendName and FriendPic parameters
export default function CreateHugPage({ navigation, route }) {
    // States
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [base64Strings, setBase64Strings] = useState([]);
    const [totalChars, setTotalChars] = useState(0);
    const [callingBackend, setCallingBackend] = useState(false);
    // Contexts
    const {windowWidth, windowHeight} = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    // Misc
    const { name, profile_pic, user_id, username } = route.params.data;
    const routeName = route.name;
    const validExtensions = ['jpeg', 'jpg', 'png'];
    const MAX_UPLOAD_SIZE = 100000;
    const WIDTH_FACTOR = 0.4;

    const pickFromGallery = async () => {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
          base64: true
        })
        await checkUpload(data); 
      } else {
        Alert.alert('You need to give permission to upload a picture!');
      }
    }

    const checkUpload = async (data) => {
      if (data.cancelled) {
        Alert.alert('Image upload was canceled')
      } else {
        const arr = data.uri.split('.');
        const fileExtension = arr[arr.length - 1];
        const validExtension = validExtensions.includes(fileExtension);
        if (!validExtension) {
          Alert.alert(`Accepted image types are ${validExtensions}`);
        } else {
          const compressedBase64 = await compressImage(data);
          if (compressedBase64.length + totalChars < MAX_UPLOAD_SIZE) {
            setTotalChars(prevTotalChars => 
              prevTotalChars + compressedBase64.length
            );
            setBase64Strings(prevStrings => [...prevStrings, compressedBase64]);
            setImages(prevImages => [...prevImages, data]);
          } else {
            Alert.alert('You\'ve exceeded the limit of 100KB/hug');
          }
        }
      }
    }

    const compressImage = async (data) => {
      let base64 = data.base64;    
      if (base64.length > MAX_UPLOAD_SIZE) {
        const compressFactor = MAX_UPLOAD_SIZE / base64.length;
        base64 = await getBase64WithImage(data);
      }
      return base64;
    }

    const getBase64WithImage = async (data) => {
      const manipResult = await ImageManipulator.manipulateAsync(
        data.uri,
        [{resize: { 
          width: data.width * WIDTH_FACTOR,
          height: data.height * WIDTH_FACTOR, 
        }}],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true
        }
      )
      return `data:image/jpeg;base64,${manipResult.base64}`;
    }

    const callBackend = async () => {
      setCallingBackend(true);
      const request = {
        friendId: user_id,
        message: message,
        base64: base64Strings
      }
      const { status, data } = 
        await CreateAPI.createHug(userData.uid, request);
      
      setTimeout(async () => {
        setCallingBackend(false);
        if (status) {
          const hugRequest = {
            friend_id: user_id,
            hug_id: data.out,
          }
          const { hugStatus, hugData } = 
            await CreateAPI.sendHugRequest(userData.uid, hugRequest);
          console.log('CreateHug 143', hugStatus, hugData);
          if (hugStatus) {
            const firstName = name.split(' ')[0]
            Alert.alert(`Hug sent to ${firstName}!`);
          } else {
            Alert.alert('Hug created, but could not send notification.')
          }
        } else {
          Alert.alert('Error creating hug.');
        }
        
        navigation.navigate('Main Nav Page');
      }, 1000);
    }

    const isEmpty = (obj) => {
      return Object.keys(obj).length == 0;
    }

    const styles = StyleSheet.create({
      mainContainer: {
        overflow: 'hidden',
        height: windowHeight * .75,
      },
      profilePic: {
        width: windowWidth / 4,
        height: windowWidth / 4,
        borderRadius: 50,
      },
      profilePicContainer: {
        borderColor: '#FFF',
        borderWidth: 3,
        borderRadius: 100,
        marginLeft: windowWidth * .05,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
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
        borderColor: 'black',
        width: windowWidth / 1.8,
      },
      friendText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular'
      },
      picContainer: {
        width: windowWidth,
        height: windowHeight * .25,
        overflow: 'hidden',
        marginTop: windowHeight * .05,
      },
      pics: {
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 3,
        width: windowWidth / 3, 
        height: windowWidth / 3, 
        marginTop: 10, 
        marginLeft: 10,
      },  
      backgroundImg: {
        height: windowHeight,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
      },
      header: {
        width: windowWidth,
        alignItems: 'center',
        marginTop: windowHeight / 16,
        marginBottom: windowHeight / 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
        zIndex: 3,
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
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      uploadingText: {
        color: 'green',
        fontSize: 18,
        textAlign: 'center',
      },
    });

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Header 
            routeName={routeName} 
            navigation={navigation} 
            onMainNav={false}
          />            
          <ImageBackground 
            source={BackgroundImg} 
            style={styles.backgroundImg}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Create Hug
              </Text>
            </View>

            <View style={styles.mainContainer}>
              {/* Friend Info */}
              <View style={{alignItems: 'center',}}>
                <View style={styles.friendInfoContainer}>
                  <View style={styles.profilePicContainer}> 
                    <Image
                      source={{ uri : profile_pic }}
                      style={styles.profilePic}
                    />
                  </View>
                  
                  <View style={styles.friendTextContainer}>
                    <Text style={styles.friendText}>
                      Sending hug to:
                    </Text>
                    <Text style={styles.friendText}>
                      {name}
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
                      source={isEmpty(item) || item.cancelled ? 
                        profilePic : {uri: `${item.uri}`}
                      }
                      style={styles.pics}
                    />
                  ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {
              images.length > 0 && 
              message.length > 0 &&
              !callingBackend &&
              <View>
                <LinkedButton
                  text='SEND HUG'
                  color='#FB7250'
                  onPress={() => callBackend()}
                />
              </View>
            }
            {
              callingBackend &&
              <View style={styles.textContainer}>
                <Text style={styles.uploadingText}>
                  Creating Hug...
                </Text>
                <View style={{marginRight: 10,}}>
                  <ActivityIndicator />
                </View>
              </View>
            }
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
}
