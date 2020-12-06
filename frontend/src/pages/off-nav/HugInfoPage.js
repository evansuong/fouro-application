import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import Header from '../../components/Header';
import { DimensionContext } from '../../contexts/DimensionContext';
import { UserContext } from '../../contexts/UserContext';

export default function HugInfoPage({ navigation, route }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const routeName = route.name;
    const { data } = route.params;
    const { friend_name, hug_id, image, message } = data;

    const { userData } = useContext(UserContext);
    const { isLightTheme } = userData;
    const [pinned, setPinned] = useState(false);
    // console.log(data)

    // TODO: uncomment line below when pulling data from firestore or whatever and delete the following test block
    //       hugId will be passed in and we fetch the hug info with that hugId
    // const { hugId, completed, dateTime, images, receiverDescription, receiverId, senderDescription, senderId } = route.params.data
    
    // TODO: delete the following test block
    const hugId = 1
    const completed = true
    const dateTime = "April 1, 2021"
    const images = [{id: 1, pic: require("assets/profilePic.jpg")}, {id: 2, pic: require("assets/profilePic.jpg")}, {id:3, pic: require("assets/profilePic.jpg")}]
    const receiverDescription = "omae wa mou shindeiru adsfadskfdajsfhjadh jfadkfjadk  adskjfh aklhdfkljh adskjhf adklshfakshfajklsdfh "
    const senderDescription = "Roses are red, violets are blue jahdfladskjfh kjlahdf kjladshf kjhkjahdf kjhadskljfjhadsfh kljahsdfajsdfh"
    const receiverId = "@EvanSuong"
    const senderId = "@AlexChow"

    // sizing
    const textContainerWidth = windowWidth / 1.1;
    const textWidth = textContainerWidth / 1.1;

    const statusBarHeight = StatusBar.currentHeight == null ? windowHeight * 0.05 : StatusBar.currentHeight

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: 'white',
            marginTop: statusBarHeight,
            paddingBottom: statusBarHeight,
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
            width: '100%'
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
        },
        hugDateText: {
            marginBottom: 10,
        },
        images: {
            flexDirection: 'row',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginHorizontal: 10
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
            marginLeft: -50,
            flex: 1,
            padding: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: '#8677E5',
            marginBottom: 20,
        },
        textAreaUser: {
            marginRight: -50,
            flex: 1,
            padding: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: '#E57777',
            marginBottom: 20,
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
            justifyContent: 'center'
        },
        pinButtonIcon: {
            width: 50, 
            height: 50,
        }
    })

    function pinHug() {
        if(!pinned) {
            setPinned(true)
            // call the backend function for pinning
        } else {
            setPinned(false)
            // call the backend function for unpinning
        }
    }
    
    return (
        <View style={{ backgroundColor: 'white' }}>

            {/* header */}
            <Header routeName={routeName} navigation={navigation} onMainNav={false} />

            <ScrollView style={styles.mainContainer}>
                <View style={styles.header}>
                        {/* hug date */}
                        <Text style={styles.hugDateText}>{dateTime}</Text>

                        {/* insert first hug picture -- default is friend's prof pic */}
                        <Image source={{ uri: image }} style={styles.imageContainer}/>
                </View>
            
                <View style={styles.notificationContent}>    
                    <View style={{ ...styles.textAreaFriend, maxWidth: textContainerWidth }}>
                        {/* Text from friend */}
                        <Text style={{...styles.username, color: "#FFF"}}>{senderId}</Text>
                        <Text style={{ ...styles.message, width: textWidth, color: "#FFF" }}>{senderDescription}</Text>
                    </View>
                    <View style={{ ...styles.textAreaUser, maxWidth: textContainerWidth }}>
                        {/* Text from user */}
                        <Text style={{...styles.username}}>{receiverId}</Text>
                        <Text style={{ ...styles.message, width: textWidth }}>{receiverDescription}</Text>
                    </View>  
                </View>            

                {/* more hug imgs */}
                <View style={styles.images}>
                    <ScrollView horizontal={true}>
                        {images.map(img => (
                            <Image source={img.pic} style={styles.imageContainer} key={img.id}/>
                        ))}
                    </ScrollView>
                </View>


            </ScrollView>

            <TouchableOpacity 
                style={[styles.pinButton, {backgroundColor: pinned ? 'orange' : '#d4d4d4'}]}
                onPress={pinHug}>
                <Image 
                    source={require('assets/pinIcons/0015.png')}
                    style={styles.pinButtonIcon}
                />
            </TouchableOpacity>

        </View>
        
    )
}