import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { DimensionContext } from '../../contexts/DimensionContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';



const pic = require('assets/fillerProfilePic.jpg')

export default function SearchPage({ input, navigation }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext)
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
                setUserList(testStrangerData.filter(user => user.username === input ))
            }
        }
    }, [input, searchFriends])

    console.log('render')


    // when we actually pass info to the OtherUserProfilePage, just append isStranger and isPending to the end
    const testFriendData = [
        {user_id: 1, name: 'e', username: 'a', pfp: pic, isStranger: false, isPending: false},
        {user_id: 2, name: 'eva', username: 'al', pfp: pic, isStranger: false, isPending: false},
        {user_id: 3, name: 'eva', username: 'ale', pfp: pic, isStranger: false, isPending: false},
        {user_id: 4, name: 'evan', username: 'alex', pfp: pic, isStranger: false, isPending: false},
        {user_id: 5, name: 'evans', username: 'alexc',pfp: pic, isStranger: false, isPending: false},  
        {user_id: 6, name: 'evansu', username: 'alexch', pfp: pic, isStranger: false, isPending: false},
        {user_id: 7, name: 'evansuo', username: 'alexchow',pfp: pic, isStranger: false, isPending: false},
        {user_id: 8, name: 'evansuon', username: 'alexchowmein',pfp: pic, isStranger: false, isPending: false},
        {user_id: 9, name: 'evansuong', username: 'alexchowmei', pfp: pic, isStranger: false, isPending: false},
        {user_id: 10, name: 'evansuong', username: 'alexchowmen', pfp: pic, isStranger: false, isPending: false},
    ]

    // again, pass 
    const testStrangerData = [
        {user_id: 1, name: 's', username: 'a', pfp: pic, isStranger: true, isPending: false},
        {user_id: 2, name: 'su', username: 'al', pfp: pic, isStranger: true, isPending: true},
        {user_id: 3, name: 'suo', username: 'ale', pfp: pic, isStranger: true, isPending: false},
        {user_id: 4, name: 'suon', username: 'alex', pfp: pic, isStranger: true, isPending: false},
        {user_id: 5, name: 'suong', username: 'alexc', pfp: pic, isStranger: true, isPending: true},
        {user_id: 6, name: 'suonge', username: 'alexch', pfp: pic, isStranger: true, isPending: false},
        {user_id: 7, name: 'suongev', username: 'alexcho', pfp: pic, isStranger: true, isPending: true},
        {user_id: 8, name: 'suongeva', username: 'alexchow', pfp: pic, isStranger: true, isPending: true},
        {user_id: 9, name: 'suongevan', username: 'alexchowm', pfp: pic, isStranger: true, isPending: false},
        {user_id: 10, name: 'suongevan', username: 'alexchowme', pfp: pic, isStranger: true, isPending: false},
    ]

    function searchStrangersList({ route }) {

        useFocusEffect(() => {
            setSearchFriends(false)
        })

        function viewUser(userData) {
            // TODO: change this route name to Other User Profile
            navigation.navigate('Friend Profile', userData)
        }

        return (
            <ScrollView>
            {userList.map(userData => (
                <TouchableOpacity key={userData.user_id} onPress={() => viewUser(userData)}>
                    <View style={styles.userCard}>
                        <Image style={{ width: windowWidth / 10, height: windowWidth / 10, ...styles.profPic }} source={userData.pfp}/>
                        <Text style={styles.userText}>{userData.name}</Text>
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

        return (
            <ScrollView>
            {userList.map(userData => (
                <TouchableOpacity key={userData.name} onPress={() => viewFriend(userData)}>
                    <View style={styles.userCard}>
                        <Image style={{ width: windowWidth / 10, height: windowWidth / 10, ...styles.profPic }} source={userData.pfp}/>
                        <Text style={styles.userText}>{userData.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        )
    }

    return (
        <View style={{ width: windowWidth / 1.1, height: windowHeight / 1.4 }}>
            <Tab.Navigator style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
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
