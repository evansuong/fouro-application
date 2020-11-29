import { getFocusedRouteNameFromRoute, NavigationHelpersContext } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';
const backIcon = require('assets/back-icon.png');
const searchIcon = require('assets/magnifyingGlass.png');
const profileIcon = require('assets/user-icon.png');
const editIcon = require('assets/edit-icon.png');
const corkboardIcon = require('assets/corkboard-icon.png');
const dotsIcon = require('assets/dots-icon.png');



// function formats button data into an object 
function buildButtonProps(name, icon, onPress) {

    return {
        name: name,
        onPress: onPress,
        icon: icon,
    }
}



// button functions return button objects to be passed into headerButton
function BackButton(navigation) {
    function onPress() {
        if(navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.replace('Main Nav Page');
        }
    }
    return buildButtonProps('back', backIcon, onPress);
}

function SearchButton(navigation) {
    function onPress() {
        alert('search button pressed');
    }
    return buildButtonProps('search', searchIcon, onPress);
}

function ProfileButton(navigation) {
    function onPress() {
        navigation.replace('User Profile Page', { page: 'Profile' });
    }
    return buildButtonProps('profile', profileIcon, onPress);
}

function EditButton(navigation) {
    function onPress() {
        alert('edit button pressed');
    }
    return buildButtonProps('edit', editIcon, onPress);
} 

function CorkboardButton(navigation) {
    function onPress() {
        navigation.navigate('Corkboard');
    }
    return buildButtonProps('corkboard', corkboardIcon, onPress);
} 

function RemoveFriendButton(navigation) {
    function onPress() {
        alert('remove friend button pressed')
    }
    return buildButtonProps('remove', dotsIcon, onPress);
} 




export function HeaderButton({ name, icon, onPress }) {

    // console.log("buttonName: ", name)

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const styles = {
        btnContainer: {
            backgroundColor: 'rgba(0, 0, 0, .5)', 
            borderRadius: 100,
            height: windowWidth / 8.5,
            width: windowWidth / 8.5, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        btnImage: {
            width: '50%',
            height: '50%',
            overflow: 'visible',
        }
    }
  
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.btnContainer}> 
                <Image style={styles.btnImage} source={icon} />
            </View>
        </TouchableOpacity>
    )
}



// TODO: ALLOW ON PRESS FUNCTIONS TO BE PASSED IN AS PROPS
export default function Header(props) {
    
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const { route, navigation, onMainNav } = props;

    // standardize route param names

    // titles for pages on the main navigation
    const mainNavTitles = {
        Friends: 'Friends',
        Home: 'Hug Feed',
        Notifications: 'Notifications'
    };

    // collection of headerbuttons to render based on the page
    const headerButtons = {
        'Friends': [SearchButton(navigation)],
        'Home': [ProfileButton(navigation), CorkboardButton(navigation)],
        'Notification': '',
        'User Profile Page': [EditButton(navigation)],
        'Friend Profile': [RemoveFriendButton(navigation)],
        'Hug Info': '',
        'Create Hug': '',
        'Corkboard': '',
    };

    let title = ''
    let buttons = []

    // update to render main nav header
    if (onMainNav) {
        let currentRoute = (route.name)
        title = mainNavTitles[currentRoute]
        buttons = headerButtons[currentRoute]

    // update to render off nav header
    } else if (route.name) {
        console.log(route.name)
        buttons = [BackButton(navigation), ...headerButtons[route.name]]
        console.log(buttons)
        console.log(buttons.length)
    }

    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth / 1.1,
            marginTop: windowHeight / 20,
        }, 
        title: {
            fontWeight: 'bold',
            fontSize: 30,
        },
        filler: {
            width: windowWidth / 8.5,
            height: windowWidth / 8.5,
        },
    });

    // buttons && console.log(buttons.length)
    // console.log(onMainNav)
  
    // return new header
    return (
        <View style={styles.header}>
            {buttons ? <HeaderButton {...buttons[0]}/> : <View style={styles.filler}/>}
            {title !== '' && 
                <Text style={styles.title}>{props.children}</Text>
            }
            {buttons && buttons.length > 1 && buttons[1] !== '' ? <HeaderButton {...buttons[1]}/> : <View style={styles.filler}/>}
        </View>
    )
}



