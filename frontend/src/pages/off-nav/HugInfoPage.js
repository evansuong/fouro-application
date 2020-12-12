import React, { useContext, useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
} from 'react-native'
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// APIs
import { ReadAPI, UpdateAPI } from '../../API';
// Custom Components
import Header from 'components/Header';
import LinkedButton from 'components/LinkedButton'



/* testing */

// TODO: delete the following test block
const hugId = 1
const completed = true
const dateTime = "April 1, 2021"
const images = [{id: 1, pic: require("assets/profilePic.jpg")}, {id: 2, pic: require("assets/profilePic.jpg")}, {id:3, pic: require("assets/profilePic.jpg")}]
const receiverDescription = "omae wa mou shindeiru adsfadskfdajsfhjadh jfadkfjadk  adskjfh aklhdfkljh adskjhf adklshfakshfajklsdfh "
const senderDescription = "Roses are red, violets are blue jahdfladskjfh kjlahdf kjladshf kjhkjahdf kjhadskljfjhadsfh kljahsdfajsdfh"
const receiverId = "@EvanSuong"
const senderId = "@AlexChow"

/* end testing */




export default function HugInfoPage({ navigation, route }) {
  // States
  const [pinnedButton, setPinnedButton] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [fetchedUser, setFetchedUser] = useState({});
  const [fetchedHug, setFetchedHug] = useState();
  const [image, setImage] = useState();
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  const { isLightTheme, uid } = userData;
  // Misc
  const routeName = route.name;
  const { data } = route.params;
  let { hug_id, notification_id, clearFunction, pinned } = data;
  // sizing
  const textContainerWidth = windowWidth / 1.1;
  const textWidth = textContainerWidth / 1.3;
  const statusBarHeight = 
  StatusBar.currentHeight == null ? 
    windowHeight * 0.05 : StatusBar.currentHeight

  useEffect(() => {

    if (startUp) {
      setStartUp(false);
      fetchUserData();
      fetchEventData();
    }
  }, []);

  const fetchUserData = async () => {
    const { status, data } = 
      await ReadAPI.getUserProfile(userData.uid);
    if (status) {
      setFetchedUser(data);
    } else {
      Alert.alert('Something went wrong when fetching user data');
    }
  }

  const fetchEventData = async () => {
    let { status, data } = 
      await ReadAPI.getHugById(userData.uid, hug_id);
    if (status) {
      setImage(data.images[0])
      data.images = data.images.slice(1, data.images.length);
      setFetchedHug(data);
      setPinnedButton(pinned)
    } else {
      Alert.alert('Something went wrong when retrieving hug info');
    }
  }

  async function pinHug() {
    if(!pinnedButton) {
      const request = {
        hug_id: hug_id
      }
      await UpdateAPI.pin(uid, request)
      .then(({ data }) => {
        data.out && setPinnedButton(true)
      });
    } else {
      const request = {
        hug_id: hug_id
      }
      UpdateAPI.unpin(uid, request)
      .then(({ data }) => {
        data.out && setPinnedButton(false)
      })    
    }
  }

  function hugBack() {
    navigation.navigate('Catch Hug Page', { data: { 
      friendUsername: fetchedHug.sender_username, 
      friendName: fetchedHug.sender_name,
      friendPfp: fetchedHug.sender_profile_picture,
      hugId: hug_id,
      friendId: fetchedHug.sender_id,
      notification_id: notification_id,
      clearFunction: clearFunction,
    } })
  }

  function checkImages() {
    return Object.keys(fetchedHug).length > 0 &&
          typeof fetchedHug !== 'undefined' && 
           typeof fetchedHug.images !== 'undefined' && 
           fetchedHug.images.length > 0
  }

  function checkDescription() {
    return fetchedHug.receiver_description !== ''
  }

  const styles = StyleSheet.create({
    pageContainer: {
      width: windowWidth,
      height: windowHeight,
      backgroundColor: 'white'
    },
    mainContainer: {
      backgroundColor: 'white',
      marginTop: statusBarHeight,
    },
    header: {
      backgroundColor: 'transparent',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingVertical: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    body: {
      backgroundColor: 'transparent',
      paddingTop: 20
    },
    username: {
      paddingVertical: 5,
      paddingHorizontal: 5,
      fontWeight: 'bold',
      fontSize: 20,
      width: '100%',
      color: "#FFF",
    },
    message: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      width: textWidth - windowWidth * 0.05 , 
      color: "#FFF",
    },
    hugDateText: {
      marginBottom: 10,
    },
    images: {
      flexDirection: 'row',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      marginHorizontal: 10,
    },
    imageContainer: {
      height: 250,
      width: 250,
      borderColor: 'white',
      justifyContent: 'center',
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 20,
      marginBottom: 30,
    },
    notificationContent: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    textAreaFriend: {
      color: 'white',
      marginLeft: -120,
      flex: 1,
      padding: 10,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: '#8677E5',
      marginBottom: 20,
      maxWidth: textContainerWidth
    },
    textAreaUser: {
      marginRight: -100,
      flex: 1,
      padding: 10,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      backgroundColor: '#E57777',
      marginBottom: 20,
      maxWidth: textContainerWidth,
    },
    pinButton: {
      borderRadius: 100,            
      shadowColor: '#000',
      shadowOffset: {
          width: 5,
          height: 5,
      },
      shadowOpacity: 0.41,
      shadowRadius: 7,
      elevation: 10,
      width: 70,
      height: 70,
      position: 'absolute',
      bottom: 25,
      right: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: pinnedButton ? 'orange' : '#d4d4d4'
    },
    pinButtonIcon: {
      width: 50, 
      height: 50,
    },
    hugBtnContainer: {
      display: 'flex',
      alignItems: 'center',
      width: windowWidth,
      position: 'absolute',
      bottom: windowHeight * .05,

    },
    hugBackBtnContainer: {
      width: windowWidth * .8,
      backgroundColor: '#E57777',
      display: 'flex',
      alignItems: 'center',
      padding: 15,
      borderRadius: 100,
    },
    hugBackBtn: {
      color: "#FFF", 
      fontSize: 20, 
      fontFamily: 'Montserrat_400Regular'
    },
    loadingContainer: {
      flex: 1, 
      resizeMode: 'cover', 
      justifyContent: 'center'
    }
  })
  
  if (!fetchedHug) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large'/>
      </View>
    )
  } else {
    return (
      <View style={styles.pageContainer}>
        {/* header */}
        <Header 
          routeName={routeName} 
          navigation={navigation} 
          onMainNav={false} 
        />
        {/* Main Container */}
        <ScrollView style={styles.mainContainer}>
          <View style={styles.header}>
            {/* Hug Date */}
            <Text style={styles.hugDateText}>
              {fetchedHug.date_time}
            </Text>
            {/* First hug picture */}
            <Image 
              source={{ uri: image }} 
              style={styles.imageContainer}
            />
          </View>
      
          <View style={styles.notificationContent}>    
            <View style={styles.textAreaFriend}>
              {/* Text from friend */}
              <Text style={styles.username}>
                {`@${fetchedHug.sender_username}`}
              </Text>
              <Text style={styles.message}>
                {fetchedHug.sender_description}
              </Text>
            </View>

            {
              checkDescription() &&  
              <View style={styles.textAreaUser}>
                {/* Text from self */}
                <Text style={styles.username}>
                  {`@${fetchedHug.receiver_username}`}
                </Text>
                <Text style={{ ...styles.message, width: textWidth }}>
                  {fetchedHug.receiver_description}
                </Text>
              </View>  
            }
            
          </View>            

          {/* More Hug Images */}
          <View style={styles.images}>
            {
              checkImages() &&
              <ScrollView horizontal={true}>
                {fetchedHug.images.map((img, index) => (
                  <Image 
                    source={{uri: img}} 
                    style={styles.imageContainer} key={index}
                  />
                ))}
              </ScrollView>
            }
          </View>
        </ScrollView>

        {/* Pin Icon */}
        {
          checkDescription() && 
          <TouchableOpacity style={styles.pinButton}onPress={pinHug}>
          {
            pinnedButton &&
            <Image 
              source={require('assets/pinIcons/0015.png')}
              style={styles.pinButtonIcon}
            />
          }
          {
            !pinnedButton &&
            <Image 
              source={require('assets/pinIcons/0015_bw.png')}
              style={styles.pinButtonIcon}
            />
          }
          </TouchableOpacity>
        }

        {/* hug back button */}
        {
          !checkDescription() && <View style={styles.hugBtnContainer}>
          <TouchableOpacity
            onPress={hugBack}
          >
            <View style={styles.hugBackBtnContainer}>
              <Text style={styles.hugBackBtn}>
                Hug Back!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        }
      </View>
    )
  }
}