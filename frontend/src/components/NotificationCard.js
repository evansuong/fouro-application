import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import { DimensionContext } from '../contexts/DimensionContext';


const COLLAPSED_CARD_HEIGHT_PROPORTION = 4.6;
const EXPANDED_CARD_HEIGHT_PROPORTION = 2.7;
const ANIMATION_DURATION_MS = 150;
const VISIBLE = 1;
const HIDDEN = 0;

/**
 */
export default function NotificationCard({ notificationData, isFocused, handleAccept, handleDecline }) {

    // prop destructuring: { notification type, user that generated notif, sender pp, notification id }
    const { type, user, image, id } = notificationData;

    // hold whether or not this panel is expanded or not
    const [expanded, setExpanded] = useState(false);

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    
    // animated value to animate panel expansion and collapse
    const height = useRef(new Animated.Value(windowWidth / COLLAPSED_CARD_HEIGHT_PROPORTION)).current;
    const fade = useRef(new Animated.Value(0)).current;

    const notificationMessage = type === 'r' ? "sent you a friend request" : "sent you a hug!"
    const acceptBtnText = type === 'r' ? 'Accept' : 'Catch'
    const declineBtnText =  type === 'r' ? 'Decline' : 'Drop'

    // auto collapse panels if the user leaves the notification page
    useEffect(() => {
        if (!isFocused) {
            setExpanded(false);
            collapse();
        }
    }, [isFocused])

    // toggle panel expansion on press
    function handlePress() {
        setExpanded(!expanded);
        if(expanded) {
            collapse();
        } else {
            expand();
        }
    }

    // expand animation definition
    function expand() {
         // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(height, {
            toValue: windowWidth / EXPANDED_CARD_HEIGHT_PROPORTION,
            duration: ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: VISIBLE,
            duration: ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
    }

    // collapse animation definition
    function collapse() {
        Animated.spring(height, {
            toValue: windowWidth / COLLAPSED_CARD_HEIGHT_PROPORTION,
            duration: ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: HIDDEN,
            duration: ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
    }

    const styles = StyleSheet.create({
        hugPanelContainer: {
            display: 'flex',
            justifyContent: 'center',
            
            backgroundColor: '#ffffff', 
            borderRadius: 10,

            margin: windowWidth / 75,
            width: windowWidth / 1.1,

            shadowColor: '#444',
            shadowOffset: { height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
        },
        cardColor: {
            backgroundColor: type === 'r' ? '#8677E5' : '#E57777', 
            width: windowWidth / 30,
            height: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },  
        bodyContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        notificationContent: {
            padding: windowWidth / 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: windowWidth / 4.7,
            backgroundColor: 'pink',
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            paddingTop: 0,
            backgroundColor: 'red',
        },
        textArea: {
            color: '#000',
            fontSize: 18,
            marginHorizontal: 10,
            flex: 1,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        buttonText: {
            fontSize: 15,  
        },
        acceptButtonText: {
            color: "white",
        },  
        declineButtonText: {
            color: type === 'r' ? '#8677E5' : '#E57777', 
        },
        buttonContainer: {
            borderRadius: 100,
            height: windowWidth / 10,
            width: windowWidth / 2.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: windowWidth / 50,
        },
        acceptButtonContainer: {
            backgroundColor: type === 'r' ? '#8677E5' : '#E57777', 
        },
        declineButtonContainer:{
            backgroundColor: '#FFFFFF',
            borderColor: type === 'r' ? '#8677E5' : '#E57777', 
            borderStyle: 'solid', 
            borderWidth: 1,
        },
        image: {
            height: windowWidth / 8,
            width: windowWidth / 8,
            borderRadius: 100,
        },
        imageContainer: {
            marginRight: windowWidth / 100,
            marginTop: windowWidth / 100,
            shadowColor: '#444',
            shadowOffset: { height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
        },
    }) 
    


    return (
        <View style={{ ...styles.hugPanelContainer, display: 'flex' }}>
            <TouchableOpacity onPress={handlePress} activeOpacity={1.0}>
                
                {/* body */}
                <Animated.View style={{ height: height, ...styles.bodyContainer }}>

                    {/* card color */}
                    {/* <View style={styles.cardColor}><Text></Text></View> */}

                    {/* notification content */}
                    <View style={{ padding: 0 }}>
                        <View style={styles.notificationContent}>
                            <View style={styles.textArea}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {user}
                                    </Text>  
                                    {/* <Text>
                                        {notificationMessage}
                                    </Text> */}
                                </View>
                                
                                {/* <Text style={{ fontSize: 12, color: '#bbbbbb' }}>
                                    23m ago
                                </Text> */}
                            </View>
                            {/* <View style={styles.imageContainer}>
                                <Image style={styles.image} source={image} />
                            </View> */}
                        </View>
                        
                        
                        {/* footer button container */}
                        <View style={styles.footer}>
                          {/* <Text>hello</Text> */}
                            {/* accept button */}
                            <TouchableOpacity 
                                disabled={!expanded} 
                                onPress={() => handleAccept(id)}
                            >
                                <Animated.View 
                                    style={{ ...styles.buttonContainer, ...styles.acceptButtonContainer }} 
                                    opacity={fade}
                                >
                                    <Text style={{ ...styles.buttonText, ...styles.acceptButtonText }}>
                                        {acceptBtnText}
                                    </Text>    
                                </Animated.View>
                            </TouchableOpacity>

                            {/* decline button */}
                            <TouchableOpacity 
                                disabled={!expanded} 
                                onPress={() => handleDecline(id)}
                            >
                                <Animated.View 
                                    style={{ ...styles.buttonContainer, ...styles.declineButtonContainer}} 
                                    opacity={fade}
                                >
                                    <Text style={{ ...styles.buttonText, ...styles.declineButtonText} }>
                                        {declineBtnText}
                                    </Text>    
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}
        
