import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { DimensionContext } from '../../contexts/DimensionContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';



const pic = require('assets/fillerProfilePic.jpg')

export default function SearchPage({ input, navigation }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    const { isLightTheme } = userData;

    const [userList, setUserList] = useState([]);
    const [searchFriends, setSearchFriends] = useState(true);
    const Tab = createMaterialTopTabNavigator();

    function toggleSearchList() { setSearchFriends(!searchFriends) }
   
    
    useEffect(() => {
        if (input === '') {
            setUserList([])
        } else {
            if (searchFriends) {
                setUserList(testFriendData.filter(user => user.name === input ))
            } else {
                setUserList(testStrangerData.filter(user => user.name === input ))
            }
        }
    }, [input, searchFriends])

    console.log('render')


    const testFriendData = [
        {name: 'e', image: pic, isStranger: false, isPending: false},
        {name: 'ev', image: pic, isStranger: false, isPending: false},
        {name: 'eva', image: pic, isStranger: false, isPending: false},
        {name: 'evan', image: pic, isStranger: false, isPending: false},
        {name: 'evans', image: pic, isStranger: false, isPending: false},  
        {name: 'evansu', image: pic, isStranger: false, isPending: false},
        {name: 'evansuo', image: pic, isStranger: false, isPending: false},
        {name: 'evansuon', image: pic, isStranger: false, isPending: false},
        {name: 'evansuong', image: pic, isStranger: false, isPending: false},
    ]

    const testStrangerData = [
        {name: 's', image: pic, isStranger: true, isPending: false},
        {name: 'su', image: pic, isStranger: true, isPending: true},
        {name: 'suo', image: pic, isStranger: true, isPending: false},
        {name: 'suon', image: pic, isStranger: true, isPending: false},
        {name: 'suong', image: pic, isStranger: true, isPending: true},
        {name: 'suonge', image: pic, isStranger: true, isPending: false},
        {name: 'suongev', image: pic, isStranger: true, isPending: true},
        {name: 'suongeva', image: pic, isStranger: true, isPending: true},
        {name: 'suongevan', image: pic, isStranger: true, isPending: false},
    ]

    function searchStrangersList({ route }) {

        useFocusEffect(() => {
            setSearchFriends(false)
        })

        function viewFriend(userData) {
            navigation.navigate('Friend Profile', userData)
        }

        let textColor = isLightTheme ? '#000' : '#FFF';
        let borderColor = isLightTheme ? '#FFF' : '#555';
        let backgroundColor = isLightTheme ? '#FFF' : '#333'

        return (
            <ScrollView style={{ backgroundColor: backgroundColor }}>
            {userList.map(userData => (
                <TouchableOpacity key={userData.name} onPress={() => viewFriend(userData)}>
                    <View style={{...styles.userCard, borderBottomColor: borderColor}}>
                        <Image style={{ width: windowWidth / 10, height: windowWidth / 10, ...styles.profPic }} source={userData.image}/>
                        <Text style={{...styles.userText, textColor}}>{userData.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        )
    }

    function searchFriendList({ route }) {

        useFocusEffect(() => {
            setSearchFriends(true)
        })

        function viewFriend(userData) {
            navigation.navigate('Friend Profile', userData)
        }

        let textColor = isLightTheme ? '#000' : '#FFF';
        let borderColor = isLightTheme ? '#FFF' : '#555';
        let backgroundColor = isLightTheme ? '#FFF' : '#333'

        return (
            <ScrollView style={{backgroundColor: backgroundColor}}>
            {userList.map(userData => (
                <TouchableOpacity key={userData.name} onPress={() => viewFriend(userData)}>
                    <View style={{...styles.userCard, borderBottomColor: borderColor }}>
                        <Image style={{ width: windowWidth / 10, height: windowWidth / 10, ...styles.profPic }} source={userData.image}/>
                        <Text style={{...styles.userText, color: textColor }}>{userData.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        )
    }

    let backgroundColor = isLightTheme ? '#FFF' : '#555';



    return (
        <View style={{ width: windowWidth / 1.1, height: windowHeight / 1.4 }}>
            <Tab.Navigator 
                style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                tabBarOptions={{
                    activeTintColor: isLightTheme ? 'purple' : '#E57777',
                    style: { backgroundColor: isLightTheme ? '#FFF' : 'rgb(50, 50, 50)' },
                    indicatorStyle: { 
                        backgroundColor: isLightTheme ? 'purple' : '#E57777',
                    }
                }}>
                <Tab.Screen name="Friends" component={searchFriendList}/>
                <Tab.Screen name="Users" component={searchStrangersList}/>
            </Tab.Navigator>
        </View>
    )
}





const styles = StyleSheet.create({
    userCard: {
        padding: 10,
        borderBottomColor: '#BBB',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    userText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    profPic: {
        borderRadius: 100,
    }
})
