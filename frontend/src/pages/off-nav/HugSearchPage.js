import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { ReadAPI } from '../../API';
import Header from '../../components/Header';
import { DimensionContext } from '../../contexts/DimensionContext';
import { UserContext } from '../../contexts/UserContext';

export default function HugSearchPage({ navigation, route }) {

    const [input, setInput] = useState('');
    const [friends, setFriends] = useState([]);
    const routeName = route.name;

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData, isLightTheme } = useContext(UserContext);
    const { uid } = userData;

    async function getFriends() {
        const { status, data } = await ReadAPI.getFriends(uid);
        if (status) {
            if (data.friends.length != friends.length) {    
                setFriends(data.friends);
            }
        } else {
            Alert.alert('Something went wrong when retreiving friends list');
        }
    }

    useEffect(() => {
        if (input === '') {
            getFriends()
        } else {
            ReadAPI.searchFriends(uid, input)
            .then(response => {
                if (response.status) {
                    setFriends(response.data.friends)
                }
            })
        }
    }, [input])

    function handlePress(friend) {
        navigation.navigate('Create Hug', { data: friend })
    }


    const styles = StyleSheet.create({
        input: {
            backgroundColor: '#EEE',
            width: windowWidth,
            height: windowWidth * .1,
            borderRadius: 5, 
        },
        inputContainer: {
            width: windowWidth,
            display: 'flex',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 4,
            zIndex: 3,
        }, 
        pageContainer: {
            display: 'flex',
            alignItems: 'center',
            width: windowWidth,
            height: windowHeight,
        },
        header: {
            height: windowHeight * .13,
            backgroundColor: '#FCA661',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerText: {
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: windowHeight * .03,
            color: 'white',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 4,
            zIndex: 3,
        },  
        text: {
            fontSize: 23,
            marginLeft: windowWidth * .05
        },
        image: {
            width: windowWidth * .1,
            height: windowWidth * .1,
            borderRadius: 100,
        },
        friendContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: windowWidth,
            borderBottomColor: '#e4e4e4',
            borderBottomWidth: 1,
            paddingHorizontal: windowWidth * .1,
            paddingVertical: windowWidth * .01
        }
    })

    return (
        <View style={styles.pageContainer}>
            <Header navigation={navigation} routeName={routeName} onMainNav={false}/> 
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Hug Recipient</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={'friend name: i.e. Firstname Lastname'}
                    keyboardType='web-search' 
                    style={styles.input}
                    onChangeText={(val) => setInput(val)}
                    autoCapitalize='none'
                />
            </View>
          
            {friends && friends.length > 0 ?
                <ScrollView>
                    {friends.map(friend => (
                        <TouchableOpacity style={styles.friendContainer} key={friend.user_id} onPress={() => handlePress(friend)}>
                            <Image style={styles.image} source={{ uri: friend.profile_pic }} />
                            <View>
                                <Text style={styles.text}>{friend.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                :
                <></>
            }
        </View>
    )
}
