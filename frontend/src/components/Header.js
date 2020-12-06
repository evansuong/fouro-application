import { getFocusedRouteNameFromRoute, NavigationHelpersContext } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import SearchPage from '../pages/off-nav/SearchPage';
import { set } from 'react-native-reanimated';
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
const dotsIcon = require('assets/dots-icon.png');
const dotsIconDark = require('assets/dots-icon-dark.png');



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

function ExitSearchButton(navigation, isLightTheme) {
    function onPress() {
        navigation()
    }
    let icon = isLightTheme ? backIconDark : backIcon;
    return buildButtonProps('search', icon, onPress);    
}

function SearchButton(navigation, isLightTheme) {
    function onPress() {
        navigation()
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
        alert('edit button pressed');
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

function RemoveFriendButton(navigation, isLightTheme) {
    function onPress() {
        alert('remove friend button pressed')
    }
    let icon = isLightTheme ? dotsIconDark : dotsIcon;
    return buildButtonProps('remove', icon, onPress);
}




export function HeaderButton({ name, icon, onPress, onMainNav, isLightTheme }) {

    // console.log("buttonName: ", name)
    // console.log(onMainNav)

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    console.log(isLightTheme)

    let width = windowWidth / 8.5;
    
    const styles = name === 'expanded search' ? {
        btnContainer: {
            backgroundColor: isLightTheme ? "#FFFFFF22" : onMainNav ? 'rgba(0, 0, 0, .2)' : 'rgba(0, 0, 0, .4)', 
            borderRadius: 100,
            height: windowWidth / 8.5,
            width: windowWidth / 1.1,
            display: 'flex', 
            justifyContent: 'right', 
            alignItems: 'center',
        },
        btnImage: {
            width: windowWidth / 15,
            height: windowWidth / 15,
            overflow: 'visible',
        }
    } : {
        btnContainer: {
            backgroundColor: isLightTheme ? "transparent" : onMainNav ? 'rgba(0, 0, 0, .2)' : 'rgba(0, 0, 0, .4)', 
            borderRadius: 100,
            height: windowWidth / 8.5,
            width: width,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        btnImage: {
            width: windowWidth / 15,
            height: windowWidth / 15,
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
    const [searching, setSearching] = useState(false);
    const [searchInput, setSearchInput] = useState();

    const { userData } = useContext(UserContext);
    const { isLightTheme } = userData;

    function enableSearch() { setSearching(true) }
    function disableSearch() { setSearching(false) }

    // collection of headerbuttons to render based on the page
    const headerButtons = {
        'Friends': searching ? [ExitSearchButton(disableSearch, isLightTheme)] : ['', SearchButton(enableSearch, isLightTheme)],
        'Hug Feed': [ProfileButton(navigation, isLightTheme), CorkboardButton(navigation, isLightTheme)],
        'Notification': '',
        'User Profile Page': [EditButton(navigation, isLightTheme)],
        'Friend Profile': '',
        'Create Hug': '',
        'Catch Hug Page': '',
        'Corkboard': '',
        'Hug Info': '',
        'Reset Password Page': '',
        'Pic Upload Page': '',
        'Login Page': '',
        'Signup Page': '',
    };

    // setting button list for header 
    let buttons = []
    // update to render main nav header
    if (onMainNav) {
        buttons = headerButtons[routeName]
    // update to render off nav header
    } else if (routeName) {
        buttons = [BackButton(navigation, isLightTheme), ...headerButtons[routeName]]
    }


    // styling
    let backgroundColor = searching ? 'rgba(255, 255, 255, .85)': onMainNav ? (isLightTheme ? "transparent" : 'rgba(0, 0, 0, .6)') : 'transparent';
    let borderRadius = searching ? 20 : 100;

    const styles = StyleSheet.create({
        headerContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: windowHeight / 20,
            position: 'absolute',
            zIndex: 5,
            backgroundColor: backgroundColor,
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
            backgroundColor: searching ? isLightTheme ? '#FFF' : 'rgb(40, 40, 40)' : 'transparent',
            width: windowWidth / 1.1,
            padding: searching ? 0 : 4,
            paddingTop: searching ? 15 : 4,
            paddingHorizontal: searching ? 15 : 4,
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
        searchPage: {
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            backgroundColor: isLightTheme ? '#EEE' : '#333',
            width: windowWidth / 1.5,
            height: windowWidth / 10,
            borderRadius: 5, 
        },
    });        
    
    // return new header
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                {buttons && buttons[0] !== ''? 
                    <HeaderButton isLightTheme={isLightTheme} {...buttons[0]} onMainNav={onMainNav}/> 
                    : 
                    <View style={styles.filler}/>
                }
                {searching ?
                    <TextInput
                        keyboardType='web-search' 
                        style={styles.input}
                        onChangeText={(val) => setSearchInput(val)}
                        autoCapitalize='none'
                    />
                    :
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{buttons && buttons.length > 2 ? <></> : props.children}</Text>
                    </View>
                }
                {buttons && buttons.length > 1 && buttons[1] !== '' ? 
                    <HeaderButton isLightTheme={isLightTheme} {...buttons[1]} onMainNav={onMainNav}/> 
                    : 
                    searching ? 
                    <></>
                    :
                    <View style={styles.filler}/>
                }
                
            </View>
            {searching &&
                <SearchPage navigation={navigation} input={searchInput}></SearchPage> 
            }
        </View>
    )
}



