import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import UserProfile from '../../components/UserProfile';
import HugCard from 'components/HugCard'
// import { FlatList } from 'react-native-gesture-handler';
import { DimensionContext } from '../../contexts/DimensionContext'
import Header from '../../components/Header';

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

export default function FriendProfilePage({ navigation, route }) {
    const icon = require("assets/overflowMenuIcon.png");
    const {windowWidth, windowHeight} = useContext(DimensionContext)

    const topMarginSize = windowWidth*0.1;

    //const hugButtonWidth = windowWidth - 50;
    //const hugButtonHeight = windowHeight / 8;

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
            // position: 'absolute',
            //marginTop: 20, // was 20
            
            zIndex: -1
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
        hugButton: {
            backgroundColor: '#FB7250',
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
            //height: 40            
        }
    });

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

    return (

        <View style={{ height: '100%', display: "flex", backgroundColor: 'white' }}>
            <Header route={route} navigation={navigation} onMainNav={false} />
            <View style={styles.userProfile, {marginTop: topMarginSize}}>
                {/* user profile information */}
                <UserProfile 
                    profilePicture={require("assets/profilePic.jpg")}
                    userFirstLast = "vicki chen"
                    username = "vickichn"
                />
            </View>

            <View style={{ display: "flex", flexShrink: 1 }}>
                <View style={styles.sharedHugsTitleContainer}>
                    <Text style={styles.sharedHugsTitle}>Shared Hugs</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.sharedHugsContainer}
                    data={testData}
                    renderItem={renderHug}
                    keyExtractor={(item) => item.hugId}
                />
                <TouchableOpacity 
                    style={[styles.hugButton, { height: 40, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={() => navigation.navigate('Create Hug', { page: 'createHug' })}
                >
                    <Text style={{fontSize: 25, color: 'white', justifyContent: 'center'}}>Hug</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    )
}