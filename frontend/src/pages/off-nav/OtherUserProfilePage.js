import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import UserProfile from '../../components/UserProfile';
import HugCard from 'components/HugCard'
import { DimensionContext } from '../../contexts/DimensionContext'
import Header from 'components/Header';
import LinkedButton from 'components/LinkedButton'
import { UserContext } from '../../contexts/UserContext';
import OptionsMenu from "react-native-options-menu";

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

export default function OtherUserProfilePage({ navigation, route,  }) {
    const {windowWidth, windowHeight} = useContext(DimensionContext)
    const routeName = route.name;
    const dotsIcon = require('assets/dots-icon.png');
    const dotsIconDark = require('assets/dots-icon-dark.png');
    const { userData } = useContext(UserContext);
    const { isLightTheme } = userData;
    // const [status, getStatus] = useState('')

    let width = windowWidth / 8.5;

    // TODO: replace with a call to getFriendStatus to get the status as a string
    //       e.g., "stranger", "friend", "pending"
    let status = 'stranger';
    const isStranger = status !== 'friend' ? true : false;
    const isPending = status === 'pending' ? true : false;
    
    // destruct route parameteres
    const { data } = route.params;
    
    const { user_id, name, profile_pic, username } = data;
    
    
          
    function removeFriend(id) {
        
    }


    // TODO: replace with getFriendProfile to get all shared hugs
    const friendProfile = { 
        sharedHugs: [],
    }

    const topMarginSize = windowWidth * 0.1;

    //const hugButtonWidth = windowWidth - 50;
    //const hugButtonHeight = windowHeight / 8;

    const renderHug = (( item ) => {
        // console.log(item.item)

        return(
        <HugCard 
            navigation={navigation}
            data={item.item}
        />)}
    )

    function handleSendRequest() {
        console.log('wererw')
    }

    /**
     * Helper function to remove friends from the Friends Page list. Calls the
     * removeFriend(user_id) method in Friends Page and navigates back.
     */
    function removeFriendFromList() {
        // removeFriend(user_id);
        navigation.goBack();
    }
        
    const styles = StyleSheet.create({
        userProfile: {
            zIndex: -1,
            marginTop: 20,
        },
        sharedHugsTitleContainer: {
            // marginTop: 5,
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
        hugButtonStyle: {
            backgroundColor: '#FB7250',
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
            backgroundColor: '#F69D68',
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
            width: windowWidth / 1.2, 
            height: 40, 
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
        button: {
          width: windowWidth / 1.2, 
          marginBottom: windowHeight / 30,
          height: windowWidth / 20,
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
            // backgroundColor: 'pink',
            zIndex: 6,
            padding: 10,
            borderRadius: 100,
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
              data={testData}
              renderItem={renderHug}
              keyExtractor={(item) => item.hug_id}
            />
        let hugButton = 
            <LinkedButton
                navigation={navigation}
                link='Create Hug'
                text='Hug'
                color='#FB7250'
            />

        //TODO: fix redirection and change to pending on click
        let sendFriendRequestButton = 
            <TouchableOpacity 
                style={styles.sendFriendRequestButtonStyle}
                onPress={handleSendRequest}
            >
                <Text style={styles.generalText}>
                  Send Friend Request
                </Text>
            </TouchableOpacity>

        let pendingButton = 
            <TouchableOpacity 
                style={styles.pendingButtonStyle}
                activeOpacity={1}
            >
                <Text style={styles.generalText}>
                    Request Pending
                </Text>
            </TouchableOpacity>
        
      

    let button = sendFriendRequestButton
    let containerStyle = {}

    if(isStranger) {
        sharedHugsContainer = <></>
        sharedHugsFlatList = <></>
        button = isStranger ? (isPending ? pendingButton : sendFriendRequestButton) : hugButton;
        containerStyle = { position: 'absolute', bottom: 0 }
    }

    return (

        <View style={{ height: '100%', display: "flex", backgroundColor: 'white', alignItems: 'center' }}>
            
            {/* <TouchableOpacity style={styles.menuBtn} onPress={removeFriend}>
                <Image style={styles.btnImage} source={dotsIconDark} />
            </TouchableOpacity> */}

            {
                !isStranger &&
                <View style={styles.menuBtn}>
                {/* add a 'close' option */}
                <OptionsMenu
                    button={dotsIconDark}
                    buttonStyle={styles.btnImage}
                    options={["remove friend"]}
                    actions={[removeFriendFromList]} />
                </View>
            }

            <Header routeName={routeName} navigation={navigation} onMainNav={false} />

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
                {sharedHugsContainer}
                {sharedHugsFlatList}
            </View>
            <View>
                {button}
            </View>
            
        </View>
    )
}