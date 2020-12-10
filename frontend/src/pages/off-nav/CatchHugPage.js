import React, { useState, useContext, useEffect } from 'react';
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
  ActivityIndicator
} from 'react-native';
// Expo Imports
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

// APIs
import { CreateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Components
import CustomTextField from 'components/CustomTextField';
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
import Header from 'components/Header';
// Images/Assets
import BackgroundImg from 'assets/gradients/middle.png';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import profilePic from 'assets/profilePic.jpg';


// TODO: Remove FriendName and FriendPic parameters
export default function CatchHugPage({ navigation, route }) {
    // States
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [base64Strings, setBase64Strings] = useState([]);
    const [totalChars, setTotalChars] = useState(0);
    const [callingBackend, setCallingBackend] = useState(false);
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    const { uid } = userData;
    // Misc
    const { friendId, friendName, friendUsername, friendPfp, hugId } = route.params.data;

    const routeName = route.name;
    const validExtensions = ['jpeg', 'jpg'];
    const MAX_UPLOAD_SIZE = 100000;

    const pickFromGallery = async () => {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        console.log('granted');
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 0.5,
          base64: true
        })
        await checkUpload(data); 
      } else {
        console.log('access denied');
        Alert.alert('You need to give permission to upload a picture!');
      }
    }
    
    const checkUpload = async (data) => {
      if (data.cancelled) {
        Alert.alert('Image upload was canceled')
      } else {
        // console.log('CatchHug Length', data.base64.length);
        const arr = data.uri.split('.');
        const fileExtension = arr[arr.length - 1];
        const validExtension = validExtensions.includes(fileExtension);
        if (!validExtension) {
          Alert.alert(`Accepted image types are ${validExtensions}`);
        } else {
          const compressedBase64 = await compressImage(data);
          // console.log('Compress Base64', compressedBase64.length);
          // console.log('CatchHug 82', totalChars);
          // console.log('CatchHugHug 83', compressedBase64.length + totalChars);
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
        // console.log('CreateHugPage 54', compressFactor);
        base64 = await getBase64WithImage(data, compressFactor);
      }
      return base64;
    }

    const getBase64WithImage = async (data, compressFactor) => {
      // console.log('CatchHug 111', data.base64.length);
      const manipResult = await ImageManipulator.manipulateAsync(
        data.uri,
        [],
        {
          compress: compressFactor,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true
        }
      )
      // console.log(manipResult.base64.length);
      return `data:image/jpeg;base64,${manipResult.base64}`;
    }

    const callBackend = async () => {
      setCallingBackend(true);
      const request = {
        hugId: hugId,
        message: message,
        base64: base64Strings
      }
      const { status, data } = 
        await CreateAPI.respondToHug(uid, request);

      setTimeout(() => {
        setCallingBackend(false);
        navigation.navigate('Main Nav Page');
        if (status) {
          Alert.alert(`Hugged ${friendName} back!`);
        } else {
          Alert.alert('Error catching hug.');
        }
      }, 3000);          
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
        // flex: 1,
        // justifyContent: 'center',
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
                Catch Hug
              </Text>
              <Text style={styles.helperHeaderText}>
                Add to { friendName }'s hug with a message and images of your 
                own!
              </Text>
            </View>

            <View style={styles.mainContainer}>
              {/* Friend Info */}
              <View style={{alignItems: 'center',}}>
                <View style={styles.friendInfoContainer}>
                  <Image
                    source={{ uri: friendPfp }}
                    style={styles.profilePic}
                  />
                  <View style={styles.friendTextContainer}>
                    <Text style={styles.friendText}>
                      {friendUsername}
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
                  <View onStartShouldSetResponder={() => true} style={{flexDirection: 'row'}}>
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
              images.length > 0 && 
              message.length > 0 &&
              !callingBackend &&
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
            {
              callingBackend &&
              <View style={styles.textContainer}>
                <Text style={styles.uploadingText}>
                  Catching Hug...
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
