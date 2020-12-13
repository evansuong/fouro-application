import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            position: 'absolute',
            height: windowHeight * .06,
            width: windowWidth * .75,
            zIndex: 100,
            backgroundColor: '#FFF',
            borderRadius: 10,
            top: windowHeight * .06,
            right: windowWidth * .05,
            paddingHorizontal: 20,
        },
        pageContainer: {
            display: 'flex',
            alignItems: 'center',
            width: windowWidth,
            height: windowHeight,
            backgroundColor: '#E57777'
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
            paddingVertical: windowWidth * .02
        }
    })

    return (
        <View style={styles.pageContainer}>
            <Header 
              navigation={navigation} 
              routeName={routeName} 
              onMainNav={false}
            />
            
            <TextInput
              keyboardType='web-search' 
              onChangeText={(val) => setInput(val)}
              autoCapitalize='none'
              placeholder="search username"
              style={styles.input}
            />
          
            <View style={{ backgroundColor: '#FFF', marginTop: windowHeight * .15 }}>
                {friends && friends.length > 0 ?
                <ScrollView>
                    {friends.map(friend => (
                        <TouchableOpacity 
                            style={styles.friendContainer} 
                            key={friend.user_id} 
                            onPress={() => handlePress(friend)}
                        >
                            <Image 
                                style={styles.image} 
                                source={{ uri: friend.profile_pic }} 
                            />
                            <View>
                                <Text style={styles.text}>
                                    {friend.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                :
                <></>
                }
            </View>
            
        </View>
    )
}
