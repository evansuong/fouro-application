
import React, { useState, useEffect, useContext } from 'react'
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';
import { UserContext } from '../contexts/UserContext';

const backIcon = require('assets/back-icon.png');
const backIconDark = require('assets/back-icon-dark.png');
const searchIcon = require('assets/search-icon.png');
const searchIconDark = require('assets/search-icon-dark.png');
const profileIcon = require('assets/user-icon.png');
const profileIconDark = require('assets/user-icon-dark.png');
const editIcon = require('assets/edit-icon.png');
const editIconDark = require('assets/edit-icon-dark.png');
const corkboardIcon = require('assets/corkboard-icon.png');
const corkboardIconDark = require('assets/corkboard-icon-dark.png');

// function formats button data into an object 
function buildButtonProps(name, icon, onPress) {
    return {
        name: name,
        onPress: onPress,
        icon: icon,
    }
}

// button functions return button objects to be passed into headerButton
function BackButton(navigation, isLightTheme) {
    function onPress() {
        if(navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.replace('Main Nav Page');
        }
    }
    let icon = isLightTheme ? backIconDark : backIcon;
    return buildButtonProps('back', icon, onPress);
}

function SearchButton(navigation, isLightTheme) {
    function onPress() {
        navigation.navigate('Search Page')
    }
    let icon = isLightTheme ? searchIconDark : searchIcon;
    return buildButtonProps('search', icon, onPress);    
}

function ProfileButton(navigation, isLightTheme) {
    function onPress() {
        navigation.navigate('User Profile Page');
    }
    let icon = isLightTheme ? profileIconDark : profileIcon;
    return buildButtonProps('profile', icon, onPress);
}

function EditButton(navigation, isLightTheme) {
    function onPress() {
        navigation.navigate('Edit Profile Page');
    }
    let icon = isLightTheme ? editIconDark : editIcon;
    return buildButtonProps('edit', icon, onPress);
}

function CorkboardButton(navigation, isLightTheme) {
    function onPress() {
        navigation.navigate('Corkboard');
    }
    let icon = isLightTheme ? corkboardIconDark : corkboardIcon;
    return buildButtonProps('corkboard', icon, onPress);
}

export function HeaderButton({ 
  name, 
  icon, 
  onPress, 
  onMainNav, 
  isLightTheme 
}) {
    const { windowWidth, windowHeight } = useContext(DimensionContext);

    let width = windowWidth / 8.5;
    
    const styles = {
        btnContainer: {
            backgroundColor: isLightTheme ? 
              "transparent" 
              : 
              onMainNav ? 
                'rgba(0, 0, 0, .2)' 
                : 
                'rgba(0, 0, 0, .4)',
            borderRadius: 100,
            height: width,
            width: width,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        btnImage: {
            width: windowWidth / 15,
            height: windowWidth / 15,
            resizeMode: 'contain',
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

    const { userData } = useContext(UserContext);
    const { isLightTheme } = userData;

    // collection of headerbuttons to render based on the page
    const headerButtons = {
        'Friends': ['', SearchButton(navigation, isLightTheme)],
        'Hug Feed': 
          [ProfileButton(navigation, isLightTheme), 
          CorkboardButton(navigation, isLightTheme)],
        'Notification': '',
        'User Profile Page': [EditButton(navigation, isLightTheme)],
        'Friend Profile': '',
        'Create Hug': '',
        'Catch Hug Page': '',
        'Corkboard': '',
        'Hug Info': '',
        'Forgot Password': '',
        'Reset Password Page': '',
        'Pic Upload Page': '',
        'Login Page': '',
        'Signup Page': '',
        'Search Page': '',
        'Hug Search Page': '',
        'Edit Profile Page': '',
        'Forgot Password': '',
    };

    useEffect(() => {
        const backAction = () => {
            const rootRoutes = new Set(['Hug Feed', 'Notifications', 'Friends']);
            if(rootRoutes.has(routeName)) {
                Alert.alert("Exit?", "Are you sure you want exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
            } else {
                navigation.goBack();
            }
            return true;
        }

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => { backHandler.remove() }
    })
    

    // setting button list for header 
    let buttons = []
    // update to render main nav header
    if (onMainNav) {
        buttons = headerButtons[routeName]
    // update to render off nav header
    } else if (routeName) {
        buttons = 
          [BackButton(navigation, isLightTheme),
          ...headerButtons[routeName]]
    }

    // styling
    let borderRadius = 100;

    const styles = StyleSheet.create({
        headerContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: windowHeight / 20,
            position: 'absolute',
            zIndex: 5,
            backgroundColor: isLightTheme ? 'transparent' : onMainNav ? 'rgba(0, 0, 0, .5)' : 'transparent',
            borderRadius: borderRadius,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isLightTheme ? 0.2 : 0.6,
            shadowRadius: 2,  
            elevation: onMainNav && !isLightTheme ? 5 : 0
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: windowWidth / 1.1,
            padding: 4,
            borderTopRightRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
        },
        title: {
            fontWeight: 'bold',
            fontSize: 30,
            color: isLightTheme ? 'black' : 'white',
        },
        filler: {
            width: windowWidth / 8.5,
            height: windowWidth / 8.5,
        },
        input: {
            backgroundColor: isLightTheme ? '#EEE' : '#333',
            width: windowWidth / 1.5,
            height: windowWidth / 10,
            borderRadius: 5, 
        },
        headerButton: {
            height: 0,
        }
    });    
    
    
    // return new header
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                {buttons && buttons[0] !== ''? 
                    <HeaderButton 
                      isLightTheme={isLightTheme} 
                      {...buttons[0]} 
                      onMainNav={onMainNav}
                    /> 
                    : 
                    <View style={styles.filler}/>
                }
            
                    
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {
                        buttons && buttons.length > 2 ? 
                        <></> 
                        : 
                        props.children
                        }
                    </Text>
                </View>
                
                {
                  buttons && buttons.length > 1 && buttons[1] !== '' ? 
                  <HeaderButton 
                    isLightTheme={isLightTheme} 
                    {...buttons[1]} 
                    onMainNav={onMainNav}
                    style={styles.headerButton}
                  /> 
                  : 
                  <View style={styles.filler}/>
                }
                
            </View>
        </View>
    )
}



