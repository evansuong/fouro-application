import React, { useState, useRef, useEffect, useContext } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Image, 
  TouchableOpacity 
} from 'react-native'
import { DimensionContext } from '../contexts/DimensionContext';


const COLLAPSED_CARD_HEIGHT_PROPORTION = 4.6;
const EXPANDED_CARD_HEIGHT_PROPORTION = 2.7;
const EXPAND_ANIMATION_DURATION_MS = 150;
const FADE_ANIMATION_DURATION_MS = 300;
const VISIBLE = 1;
const HIDDEN = 0;

/**
 */
export default function NotificationCard({ callId, notificationData, isFocused, handleAccept, handleDecline }) {

    // prop destructuring: { notification type, user that generated notif, sender pp, notification id }
    const { id, type, time, friend, friendId, hugId } = notificationData;  
    const { profPic, name } = friend;

    // hold whether or not this panel is expanded or not
    const [expanded, setExpanded] = useState(false);

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    
    // animated value to animate panel expansion and collapse
    const height = useRef(new Animated.Value(windowWidth / COLLAPSED_CARD_HEIGHT_PROPORTION)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const marginL = useRef(new Animated.Value(0)).current;

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

    function handleDisappear() {
      Animated.timing(marginL, {
        toValue: windowWidth * 1.3,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    // expand animation definition
    function expand() {
         // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(height, {
            toValue: windowWidth / EXPANDED_CARD_HEIGHT_PROPORTION,
            duration: EXPAND_ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: VISIBLE,
            duration: FADE_ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
    }

    // collapse animation definition
    function collapse() {
        Animated.spring(height, {
            toValue: windowWidth / COLLAPSED_CARD_HEIGHT_PROPORTION,
            duration: EXPAND_ANIMATION_DURATION_MS,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: HIDDEN,
            duration: FADE_ANIMATION_DURATION_MS * 0.3,
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
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            paddingTop: 0,
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
            height: windowWidth / 7,
            width: windowWidth / 7,
            borderRadius: 100,
        },
        
    }) 
    


    return (
      <Animated.View style={{marginLeft: marginL}}>
        <View style={{ ...styles.hugPanelContainer, display: 'flex' }}>
          
            <TouchableOpacity onPress={handlePress} activeOpacity={1.0}>
                
                {/* body */}
                <Animated.View style={{ height: height, ...styles.bodyContainer }}>

                    {/* card color */}
                    <View style={styles.cardColor}><Text></Text></View>

                    {/* notification content */}
                    <View style={{ padding: 0 }}>
                        <View style={styles.notificationContent}>
                            <View style={styles.textArea}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {name}
                                    </Text>  
                                    <Text>
                                        {notificationMessage}
                                    </Text>
                                </View>
                                
                                <Text style={{ fontSize: 12, color: '#bbbbbb' }}>
                                    { time }
                                </Text>
                            </View>
                            <View>
                                <Image style={styles.image} source={profPic} />
                            </View>
                        </View>
                        
                        
                        {/* footer button container */}
                        <View style={styles.footer}>
                          {/* <Text>hello</Text> */}
                            {/* accept button */}
                            <TouchableOpacity 
                                disabled={!expanded} 
                                onPress={() => handleAccept(callId, id)}
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
                                  onPress={() => {
                                    handleDisappear();
                                    setTimeout(() => {
                                      handleDecline(callId, id);
                                    }, 500);
                                  }}
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
      </Animated.View>
    )
}
        
