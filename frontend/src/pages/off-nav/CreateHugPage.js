import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import profilePic from 'assets/profilePic.jpg';
import CustomTextField from 'components/CustomTextField';
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Header from '../../components/Header';


export default function CreateHugPage({ navigation, route, friendName='Placeholder', friendPic }) {
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const routeName = route.name

    const callBackend = async () => {
      try {
        let blobArray = [];
        for (let i = 0; i < images.length; i++) {
          const splitPicURI = images[i].uri.split('/');
          let res = await getBlobObj(images[i].uri, splitPicURI[splitPicURI.length - 1]);
          blobArray.push(res);
        }
        // Send hugImagesArray to backend to push to firebase
        // Refer to https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
        // console.log('done', JSON.stringify(blobArray));
        Alert.alert('Hug created!');
      } catch (err) {
        Alert.alert('Hug creation failed. Please try again.')
      }
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
        // console.log(data);
        if (data.cancelled == false) {
          setImages(prevImages => [...prevImages, data]);
        } else {
          console.log('image canceled');
        }
      } else {
        console.log('access denied');
        Alert.alert('You need to give permission to upload a picture!');
      }
    }

    const isEmpty = (obj) => {
      return Object.keys(obj).length == 0;
    }

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('dismissed keyboard')
      }}>
        <View>
          <Header routeName={routeName} navigation={navigation} onMainNav={false} />
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
                <View onStartShouldSetResponder={() => true} style={{flexDirection: 'row'}}>
                {images.map((item) => (
                  <Image
                    key={item.uri}
                    source={isEmpty(item) || item.cancelled ? profilePic : {uri: `${item.uri}`}}
                    style={{width: 200, height: 200, marginTop: 10, marginLeft: 10,}}
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
        </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    maxHeight: Dimensions.get('window').height - 200, 
    overflow: 'hidden',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 30,
  },
  friendInfoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  friendTextContainer: {
    alignItems: 'center',
    marginLeft: 20,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'black',
    width: Dimensions.get('window').width / 1.8,
  },
  friendText: {
    fontSize: 15,
  },
  picContainer: {
    width: Dimensions.get('window').width,
    height: 250,
    overflow: 'hidden',
    marginTop: 10,
  }
});
