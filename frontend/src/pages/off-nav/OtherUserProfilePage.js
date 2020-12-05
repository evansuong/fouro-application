import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import UserProfile from '../../components/UserProfile';
import HugCard from 'components/HugCard'
import { DimensionContext } from '../../contexts/DimensionContext'
import Header from 'components/Header';
import LinkedButton from 'components/LinkedButton'

function buildTestData(name, text, img, id) {
    return {
      name: name,
      hugText: text,
      hugImage: img,
      hugId: id,
    }
  }

  const testData = [
    buildTestData('Vicki', 'do you remember', require('assets/profilePic.jpg'), '1'),
    buildTestData('Ricky', 'the 21st night of september Chow', require('assets/profilePic.jpg'), '2'),
    buildTestData('Alex', 'soulja boy tellem', require('assets/profilePic.jpg'), '3'),
    buildTestData('Evan', 'nobody \n \n\npray for\n me if t\nhey n\no\n\n\n\n\n\nt \n there \n \n \n for me', require('assets/profilePic.jpg'), '4'),
    buildTestData('Vivian', 'weeeeeeeeeeelll yea yea', require('assets/profilePic.jpg'), '5'),
  ]

export default function OtherUserProfilePage({ navigation, route }) {
    const icon = require("assets/overflowMenuIcon.png");
    const {windowWidth, windowHeight} = useContext(DimensionContext)
    const routeName = route.name;
    const { isStranger, isPending } = route.params;

    const topMarginSize = windowWidth * 0.1;

    //const hugButtonWidth = windowWidth - 50;
    //const hugButtonHeight = windowHeight / 8;

    const renderHug = (( item ) => {

        return(
        <HugCard 
            navigation={navigation}
            name={item.item.name}
            hugText={item.item.hugText}
            hugImage={item.item.hugImage}
            // hugId={item.hugId}
        />)}
    )
        
    const styles = StyleSheet.create({
        header: {
            position: 'absolute',
            zIndex: 3
        },
        removeFriendOverlay: {
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: 'flex-end'
        },
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
            width: windowWidth, 
            height: 40, 
            alignItems: 'center', 
            justifyContent: 'center'
        },
        sendFriendRequestButtonStyle: {
            backgroundColor: '#F69D68',
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
            width: windowWidth, 
            height: 40, 
            alignItems: 'center', 
            justifyContent: 'center'
        },
        friendSharedHugs: {
            display: "flex", 
            flexShrink: 1,
        },
        generalText: {
          fontSize: 25, 
          color: 'white', 
          justifyContent: 'center'
        },
        button: {
          width: windowWidth / 1.2, 
          marginBottom: windowHeight / 30
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
              keyExtractor={(item) => item.hugId}
            />
        let hugButton = 
            <TouchableOpacity 
                style={styles.hugButtonStyle}
                onPress={() => navigation.navigate('Create Hug', { page: 'createHug' })}
            >
                <Text style={styles.generalText}>
                  Hug
                </Text>
            </TouchableOpacity>

        //TODO: fix redirection and change to pending on click
        let sendFriendRequestButton = 
            <TouchableOpacity 
                style={styles.sendFriendRequestButtonStyle}
                onPress={() => navigation.navigate('Create Hug', { page: 'createHug' })}
                >
                <Text style={styles.generalText}>
                  Send Friend Request
                </Text>
            </TouchableOpacity>

        let pendingButton = 
            <View 
                style={styles.pendingButtonStyle}
                >
                <Text style={styles.generalText}>
                  Pending
                </Text>
            </View>

let button = hugButton
let containerStyle = {}

if(isStranger) {
    sharedHugsContainer = <></>
    sharedHugsFlatList = <></>
    button = isPending && isStranger ? pendingButton : sendFriendRequestButton
    containerStyle = { position: 'absolute', bottom: 0 }
}

    return (

        <View style={{ height: '100%', display: "flex", backgroundColor: 'white', alignItems: 'center' }}>
            <Header routeName={routeName} navigation={navigation} onMainNav={false} />
            <View style={styles.userProfile, {marginTop:topMarginSize}}>
                {/* user profile information */}
                <UserProfile 
                    profilePicture={require("assets/profilePic.jpg")}
                    userFirstLast = "vicki chen"
                    username = "vickichn"
                />
            </View>

            {/* shared hugs and button */}
            <View style={[styles.friendSharedHugs, containerStyle]}>
                {sharedHugsContainer}
                {sharedHugsFlatList}
                {/* {button} */}
            </View>
            <View style={styles.button}>
              <LinkedButton
                navigation={navigation}
                link='Create Hug'
                text='Hug'
                color='#FB7250'
              />
            </View>
            
        </View>
    )
}