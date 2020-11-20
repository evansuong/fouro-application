import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'

export default function HugInfoPage() {
    const friendMessage = "Hello"
    const friendUsername = "@vivian"
    const userMessage = "Hiiiiiii"
    const myUsername = "@alana"


    return (
        <View>
            {/* header */}
            <View style={styles.header}>
                <View>
                    {/* insert first hug picture -- default is friend's prof pic */}
                    <Image source={{ uri: "https://picsum.photos/200/300/?blur"}} style={styles.imageContainer}/>
                </View>  
            </View>


            {/* body */}
            <View style={styles.body}>
                {/* Text from friend */}
                <Text style={styles.username}>{friendUsername}</Text>
                <Text style={styles.message}>{friendMessage}</Text>
                {/* Text from user */}
                <Text style={styles.username}>{myUsername}</Text>
                <Text style={styles.message}>{userMessage}</Text>
            </View>

            {/* more hug imgs */}
            <View style={styles.images}>
                <ScrollView>
                    <Image source={{ uri: "https://picsum.photos/200/300/?blur"}} style={styles.imageContainer}/>
                    <Image source={{ uri: "https://picsum.photos/200/300/?blur"}} style={styles.imageContainer}/>
                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
    },
    username: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    message: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    images: {
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    imageContainer: {
        height: 200,
        width: 200,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 20,
        justifyContent: 'center',
    },
}) 