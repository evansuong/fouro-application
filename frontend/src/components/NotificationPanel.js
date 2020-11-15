import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native'

export default function NotificationPanel(props) {

    const [expanded, setExpanded] = useState(false)
    
    const {type, message, image} = props.notificationData;
    return (
        <TouchableOpacity style={styles.hugPanel} onPress={() => setExpanded(!expanded)}>

            {/* header */}
            <View style={styles.header}>
                <Text style={styles.text}>{type}</Text>
            </View>
            
            {/* body */}
            <View style={styles.body}>
                <Text style={styles.text}>{message}</Text>
                <Text style={styles.text}>{image}</Text>
            </View>
            {
                expanded &&
                // footer: default hidden
                <View style={styles.footer}>
                    <Button title="yeyeyey"></Button>
                    <Button title="nonono9no"></Button>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    hugPanel: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        margin: 5,
        borderRadius: 10,
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        paddingLeft: 10,
    },
    body: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        paddingTop: 0,
    },
    text: {
        color: 'white',
    }
}) 