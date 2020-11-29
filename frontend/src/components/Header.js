import { getFocusedRouteNameFromRoute, NavigationHelpersContext } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
 

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




export function HeaderButton({ name, icon, onPress, onMainNav }) {

    // console.log("buttonName: ", name)
    console.log(onMainNav)

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const styles = {
        btnContainer: {
            backgroundColor: onMainNav ? 'rgba(0, 0, 0, .2)' : 'rgba(0, 0, 0, .4)', 
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
    const { routeName, navigation, onMainNav } = props;

    // standardize route param names

    // collection of headerbuttons to render based on the page
    const headerButtons = {
        'Friends': [SearchButton(navigation)],
        'Hug Feed': [ProfileButton(navigation), CorkboardButton(navigation)],
        'Notification': '',
        'User Profile Page': [EditButton(navigation)],
        'Friend Profile': [RemoveFriendButton(navigation)],
        'Hug Info': '',
        'Create Hug': '',
        'Corkboard': '',
    };

    let buttons = []

    // update to render main nav header
    if (onMainNav) {
        console.log(routeName)
        buttons = headerButtons[routeName]

    // update to render off nav header
    } else if (routeName) {
        console.log(routeName)
        buttons = [BackButton(navigation), ...headerButtons[routeName]]
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
            position: 'absolute',
            zIndex: 5,
            backgroundColor: onMainNav ? 'rgba(0, 0, 0, .3)' : 'transparent',
            borderRadius: 100,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 5

        }, 
        title: {
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
        },
        filler: {
            width: windowWidth / 8.5,
            height: windowWidth / 8.5,
        },
    });

    buttons && console.log(buttons.length)
    // console.log(onMainNav)
  
    // return new header
    return (
        <View style={styles.header}>
                {buttons ? 
                    <HeaderButton {...buttons[0]} onMainNav={onMainNav}/> 
                    : 
                    <View style={styles.filler}/>
                }
                {
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{props.children}</Text>
                    </View>
                }
                {buttons && buttons.length > 1 && buttons[1] !== '' ? 
                    <HeaderButton {...buttons[1]} onMainNav={onMainNav}/> 
                    : 
                    <View style={styles.filler}/>
                }
        </View>

    )
}



