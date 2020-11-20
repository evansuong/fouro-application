import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'


export default function NotificationPanel({ index, notificationData, clearNotification, isFocused }) {

    // prop destructuring
    const { type, message, image, id } = notificationData;
    // holds if the notification page is focused

    // hold whether or not this panel is expanded or not
    const [expanded, setExpanded] = useState(false);

    // TODO: implement this to get height of the panel
    const body = useRef({})
    
    // animated value to animate panel expansion and collapse
    const height = useRef(new Animated.Value(70)).current;
    const fade = useRef(new Animated.Value(0)).current;

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
        Animated.timing(height, {
            toValue: 130,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }

    // collapse animation definition
    function collapse() {
        Animated.timing(height, {
            toValue: 70,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(fade, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }


    return (
        <TouchableOpacity style={styles.hugPanel} onPress={handlePress} activeOpacity={1.0}>
            
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.text}>{type}</Text>  
                <TouchableOpacity style={styles.clearBtn} onPress={() => clearNotification(id)}>
                    <Text style={{color: '#FFFFFF'}}>x</Text>
                </TouchableOpacity>
            </View>
            
            {/* body */}
            <Animated.View
                style={{
                    height: height // Bind opacity to animated value
                }}
            >
                <View ref={body}>
                <View style={styles.body}>
                    <Image style={styles.imageContainer} source={image} />
                    <Text style={styles.text}>{message}</Text>
                </View>
                
                {/* footer button container */}
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => type === 'request' ? alert('accepted!') : alert('caught hug!')}>
                            <Animated.View style={{
                                ...styles.buttonContainer, 
                                backgroundColor: type === 'request' ? '#8677E5' : '#E57777', 
                                opacity: fade
                            }}>
                                <Text style={styles.buttonText}>{type === 'request' ? 'Accept' : 'Catch'}</Text>    
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}
        
const styles = StyleSheet.create({
    hugPanel: {
        backgroundColor: 'rgba(0, 0, 0, .55)',
        margin: 5,
        borderRadius: 15,
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    clearBtn:{
        backgroundColor: '#88888888',
        borderRadius: 100,
        width: 18,
        height: 18,
        display: 'flex',
        alignItems: 'center',
    },
    body: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 0,
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 10,
        flex: 1,
        flexWrap: 'wrap',
    },
    buttonContainer: {
        borderRadius: 100,
        height: 35,
        width: 200,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    },  
    imageContainer: {
        borderRadius: 100,
        height: 40,
        width: 40,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 20,
    },
}) 
