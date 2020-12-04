import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native'
import Header from '../../components/Header';
import { DimensionContext } from '../../contexts/DimensionContext';

export default function HugInfoPage({ navigation, route }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const routeName = route.name;
    const { hugId, time, completed, senderId, recieverId, descriptionSender, descriptionReceiver, images } = route.params.data;

    const friendMessage = "Hello this is the incoming message for the hug. it is poggers. stan bts. " +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    const friendUsername = "@vivntng"
    const userMessage = "Hiiiiiii this is the responding msg for vivian's hug. thanks for keeping me in ur thots" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    const myUsername = "@alvna"

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
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        body: {
            backgroundColor: 'white',
            paddingTop: 20
        },
        username: {
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            width: '100%'
        },
        message: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            fontSize: 16,
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
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
            backgroundColor: 'white',
            alignItems: 'center',
        },
        textAreaFriend: {
            color: 'white',
            marginHorizontal: 10,
            flex: 1,
            padding: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderRadius: 20,
            borderColor: '#8677E5',
            borderWidth: 2, 
            marginBottom: 20,
        },
        textAreaUser: {
            color: 'white',
            marginHorizontal: 10,
            flex: 1,
            padding: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderRadius: 20,
            borderColor: '#E57777',
            borderWidth: 2, 
            marginBottom: 20,
        }
    });

    return (
        <View style={{ backgroundColor: 'white' }}>

            {/* header */}
            <Header routeName={routeName} navigation={navigation} onMainNav={false} />

            <ScrollView style={styles.mainContainer}>
                <View style={styles.header}>
                    <View>
                        {/* insert first hug picture -- default is friend's prof pic */}
                        <Image source={images[0]} style={styles.imageContainer}/>
                    </View>  
                </View>

            
                <View style={styles.notificationContent}>    
                    <View style={{ ...styles.textAreaFriend, maxWidth: textContainerWidth }}>
                        {/* Text from friend */}
                        <Text style={styles.username}>{senderId}</Text>
                        <Text style={{ ...styles.message, width: textWidth }}>{descriptionSender}</Text>
                    </View>
                    <View style={{ ...styles.textAreaUser, maxWidth: textContainerWidth }}>
                        {/* Text from user */}
                        <Text style={styles.username}>{'me, import from usercntext'}</Text>
                        <Text style={{ ...styles.message, width: textWidth }}>{descriptionReceiver}</Text>
                    </View>  
                </View>
            

                {/* more hug imgs */}
                <View style={styles.images}>
                    <ScrollView horizontal={true} style={{backgroundColor:'white'}}>
                        {images.map(img => (
                            <Image source={img} style={styles.imageContainer}/>
                        ))}
                        
                       
                    </ScrollView>
                </View>

            </ScrollView>
        </View>
        
    )
}