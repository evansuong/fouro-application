import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, Image, TouchableWithoutFeedback } from 'react-native'


export default function NotificationPanel(props) {

    const [expanded, setExpanded] = useState(false)
    const {type, message, image} = props.notificationData;

    return (
        <TouchableWithoutFeedBack style={styles.hugPanel} onPress={() => setExpanded(!expanded)}>

            {/* header */}
            <View style={styles.header}>
                <Text style={styles.text}>{type}</Text>  
            </View>
            
            {/* body */}
            <View style={styles.body}>
                <Image style={styles.imageContainer} source={image} />
                <Text style={styles.text}>{message}</Text>
            </View>
            {
                expanded &&
                // footer: default hidden
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <View style={{...styles.buttonContainer, backgroundColor: type === 'request' ? '#8677E5' : '#E57777'}}>
                            <Text style={styles.buttonText}>{type === 'request' ? 'Accept' : 'Catch'}</Text>    
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </TouchableWithoutFeedBack>
    )
}
        
const styles = StyleSheet.create({
    hugPanel: {
        backgroundColor: 'rgba(0, 0, 0, .25)',
        margin: 5,
        borderRadius: 15,
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 5,
        paddingLeft: 10,
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
