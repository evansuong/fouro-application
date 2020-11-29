import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList, 
  ScrollView,
} from 'react-native';
import fillerProfilePic from 'assets/fillerProfilePic.jpg';
import profilePic from 'assets/profilePic.jpg';
import CustomTextField from 'components/CustomTextField';
import PicUploadButton from 'components/PicUploadButton';
import LinkedButton from 'components/LinkedButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function CreateHugPage({ navigation, friendName='Placeholder', friendPic }) {
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
      console.log(images);
    }, [images])

    const callBackend = async () => {
      console.log('hug submitted');
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
        if (data.cancelled == false) {
          setImages(prevImages => [...prevImages, data]);
        } else {
          console.log('image canceled');
        }
      } else {
        console.log('access denied');
        Alert.alert('You need to give up permission to work');
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
              {/* <FlatList
                data={images}
                keyExtractor={item => item.uri}
                columnWrapperStyle={{justifyContent: 'space-around'}}
                numColumns={3}
                renderItem={({ item }) => (
                  <Image
                    source={isEmpty(item) || item.cancelled ? profilePic : {uri: `${item.uri}`}}
                    style={{width: 100, height: 100, marginTop: 10,}}
                  />
                )}
              /> */}
            </View>
          </View>

          {
            images.length > 0 && 
            <View>
              <LinkedButton
                navigation={navigation}
                link='Home Page'
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
