import React, { useContext, useState, useEffect } from 'react';
import { View, 
  Text,
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import OptionsMenu from "react-native-options-menu";
// Contexts
import { DimensionContext } from 'contexts/DimensionContext'
import { UserContext } from 'contexts/UserContext';
// Custom Components
import UserProfile from 'components/UserProfile';
import HugCard from 'components/HugCard'
import Header from 'components/Header';
import LinkedButton from 'components/LinkedButton'
import { CreateAPI, DeleteAPI, ReadAPI } from '../../API';
import { useFocusEffect } from '@react-navigation/native';





/*------- testing --------*/

function buildTestData(name, text, img, id) {
    return {
      friend_name: name,
      message: text,
      image: img,
      hug_id: id,
    }
  }

  const testData = [
    buildTestData('Vicki', 'do you remember', require('assets/profilePic.jpg'), '1'),
    buildTestData('Ricky', 'the 21st night of september Chow', require('assets/profilePic.jpg'), '2'),
    buildTestData('Alex', 'soulja boy tellem', require('assets/profilePic.jpg'), '3'),
    buildTestData('Evan', 'nobody \n \n\npray for\n me if t\nhey n\no\n\n\n\n\n\nt \n there \n \n \n for me', require('assets/profilePic.jpg'), '4'),
    buildTestData('Vivian', 'weeeeeeeeeeelll yea yea', require('assets/profilePic.jpg'), '5'),
  ]

/*------- end of testing --------*/






export default function OtherUserProfilePage({ 
  navigation, 
  route, 
  setFriendPage 
}) {
    // States
    const [hugs, setHugs] = useState();
    const [status, setStatus] = useState();
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    const { isLightTheme, uid } = userData;
    // Misc
    const routeName = route.name;
    const { data } = route.params;
    const { otheruser_id, name, username, profile_pic, updatePage } = data;
    const dotsIconDark = require('assets/dots-icon-dark.png');
    const isStranger = status !== 'friend' ? true : false;
    const isPending = status === 'pending' ? true : false;
    const topMarginSize = windowWidth * 0.1;

    useEffect(() => {
      getUserStatus();
      getSharedHugs();
    }, []);

    function getSharedHugs() {
      ReadAPI.getFriendProfile(uid, otheruser_id)
      .then(response => {
          if(response.status) {
              setHugs(response.data.sharedHugs)
          }
      });
    }

    function getUserStatus() {
      setTimeout(() => {
        ReadAPI.getFriendStatus(uid, otheruser_id)
        .then(response => 
          setStatus(response.data.status)
        );
      }, 500);
    }

    function sendFriendRequest() {
      CreateAPI.sendFriendRequest(uid, otheruser_id)
      .then(response => 
        console.log('OtherUser 85', response.status)
      );
    }

    /**
     * Helper function to remove friends from the Friends Page list. Calls the
     * removeFriend(user_id) method in Friends Page and navigates back.
     */
    function removeFriendFromList() {
      DeleteAPI.removeFriend(uid, otheruser_id)
      .then(response => {
        if (!response.status) { 
          Alert.alert('cannot remove friend'); 
        }
      });
      getUserStatus();
    }

    function cancelOption() {
      console.log('OtherUser 109 Canceled');
    }

    const renderHug = (( item ) => 
      <HugCard 
        navigation={navigation}
        data={item.item}
        image={profile_pic}
      />
    )

    function handleSendRequest() {
      const firstName = name.split(' ')[0];
      Alert.alert(
        'Confirm Friend Request',
        `Are you sure you want to add ${firstName}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('OtherUserProfile 141 Canceled'),
          },
          { 
            text: 'Yes',
            onPress: () => {
              setStatus('pending');
              sendFriendRequest();
            }
          }
        ]
      )
    }

    function handleCreateHug() {
      navigation.navigate('Create Hug', { data: {
          name: name,
          profile_pic: profile_pic,
          user_id: otheruser_id
      }})
    }

     
    const styles = StyleSheet.create({
      userProfile: {
        zIndex: -1,
        marginTop: 20,
      },
      sharedHugsTitleContainer: {
        padding: 7,
        alignItems: 'center',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        borderColor: '#D4D4D4'
      },
      sharedHugsTitle: {
        fontSize: 20,
      },
      sharedHugsContainer: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
      },
      buttonStyle: {
        width: windowWidth * .8,
        height: windowHeight * .07,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      activeButton: {
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 6,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3,
        elevation: 14,
      }, 
      hugButtonStyle: {
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        width: windowWidth / 1.2, 
        height: 40,
        justifyContent: 'center',
        marginBottom: 30,
      },
      pendingButtonStyle: {
        backgroundColor: '#999999',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        width: windowWidth / 1.2, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      sendFriendRequestButtonStyle: {
        alignItems: 'center',
        borderRadius: 30,
        margin: 10,
        width: windowWidth / 1.2, 
        height: windowHeight * .065, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      friendSharedHugs: {
        display: "flex", 
        flexShrink: 1,
      },
      generalText: {
        fontSize: 20, 
        color: 'white', 
        justifyContent: 'center'
      },
      buttonContainer: {
        width: windowWidth,
        display: 'flex',
        alignItems: 'center',
        bottom: windowHeight * .07,
        height: windowWidth / 20,
        position: 'absolute',
        zIndex: 4,
      },
      button: {
        width: windowWidth * 0.8, 
      },
      btnImage: {
        width: windowWidth / 15,
        height: windowWidth / 15,
        resizeMode: 'contain'
      },
      menuBtn: {
        position: 'absolute',
        top: windowHeight / 20 + 5,
        right: 20,
        zIndex: 6,
        padding: 10,
        borderRadius: 100,
      },
      outerContainer: {
        height: '100%', 
        display: "flex", 
        backgroundColor: 'white', 
        alignItems: 'center'
      },
      loadingContainer: {
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center'
      }
    });
    
    let sharedHugsContainer = 
      <View style={styles.sharedHugsTitleContainer}>
        <Text style={styles.sharedHugsTitle}>
          Shared Hugs
        </Text>
      </View>

    let sharedHugsFlatList = 
      <FlatList
        contentContainerStyle={styles.sharedHugsContainer}
        data={hugs}
        renderItem={renderHug}
        keyExtractor={(item) => item.hug_id}
      />

    let hugButton = 
      <TouchableOpacity 
        style={{
          backgroundColor: '#FB7250',        
          ...styles.buttonStyle, 
          ...styles.activeButton,
        }}
        onPress={handleCreateHug}
      >
        <Text style={styles.generalText}>
          Hug
        </Text>
      </TouchableOpacity>
        
    let sendFriendRequestButton = 
      <TouchableOpacity 
        style={{
          backgroundColor: '#FCA661',
          ...styles.buttonStyle,
          ...styles.activeButton,
        }}
        onPress={handleSendRequest}
      >
        <Text style={styles.generalText}>
          Send Friend Request
        </Text>
      </TouchableOpacity>

    let pendingButton = 
      <TouchableOpacity 
        style={{
          backgroundColor: '#999',
          ...styles.buttonStyle,
        }}
        activeOpacity={1}
      >
        <Text style={styles.generalText}>
          Request Pending
        </Text>
      </TouchableOpacity>
        
    
    let button = isStranger ? 
      (isPending ? pendingButton : sendFriendRequestButton) 
      : 
      hugButton;

    let containerStyle = {}
   
    if(isStranger) {
        sharedHugsContainer = <></>
        sharedHugsFlatList = <></>
        containerStyle = { position: 'absolute', bottom: 0 }
    }

    if (!hugs || !status) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large'/>
        </View>
      )
    } else {
      return (
        <View style={styles.outerContainer}>

            {
                !isStranger &&
                <View style={styles.menuBtn}>
                {/* add a 'close' option */}
                <OptionsMenu
                    button={dotsIconDark}
                    buttonStyle={styles.btnImage}
                    options={['Remove Friend', 'Cancel']}
                    actions={[removeFriendFromList, cancelOption]} />
                </View>
            }

            <Header 
              routeName={routeName} 
              navigation={navigation} 
              onMainNav={false} 
            />

            <View style={styles.userProfile, {marginTop:topMarginSize}}>
                {/* user profile information */}
                <UserProfile 
                    profilePicture={profile_pic}
                    userFirstLast = {name}
                    username = {username}
                />
            </View>

            {/* shared hugs and button */}
            <View style={[styles.friendSharedHugs, containerStyle]}>
                {hugs && hugs.length > 0 && sharedHugsContainer }
                {hugs && hugs.length > 0 ? sharedHugsFlatList : 
                !isStranger ?
                    <View>
                        <Text>No hugs yet!</Text>
                    </View> : <></>
                }
                
            </View>
            <View style={styles.buttonContainer}>
              {button}
            </View>
        </View>
      )
    }
}