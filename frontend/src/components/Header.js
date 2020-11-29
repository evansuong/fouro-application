import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';




// function formats button data into an object 
function buildButtonProps(icon, onPress) {

    return {
        onPress: onPress,
        icon: icon,
    }
}



// button functions return button objects to be passed into headerButton
function BackButton(navigation) {
    function onPress() {
        navigation.goBack();
    }
    const icon = require('assets/back-icon.png');
    return buildButtonProps(icon, onPress)
}

function SearchButton(navigation) {
    function onPress() {
        alert('search button pressed');
    }
    const icon = require('assets/magnifyingGlass.png');
    return buildButtonProps(icon, onPress)
}

function SettingsButton(navigation) {
    function onPress() {
        alert('settings button pressed');
    }
    const icon = require('assets/settings-icon.png')
    return buildButtonProps(icon, onPress)
}

function EditButton(navigation) {
    function onPress() {
        alert('edit button pressed')
    }
    const icon = require('assets/edit-icon.png');
    return buildButtonProps(icon, onPress)
} 

function CorkboardButton(navigation) {
    function onPress() {
        alert('corkboard button pressed')
    }
    const icon = require('assets/corkboard-icon.png');
    return buildButtonProps(icon, onPress)
} 





export function HeaderButton({ icon, onPress }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const styles = {
        btnContainer: {
            backgroundColor: 'rgba(0, 0, 0, .5)', 
            borderRadius: 100,
            height: windowWidth / 8,
            width: windowWidth / 8, 
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



// header template
export function Header({ route, navigation, onMainNav }) {
    
    const [title, setTitle] = useState('')      // header title
    const [buttons, setButtons] = useState([])  // header buttons
    const { windowWidth, windowHeight } = useContext(DimensionContext)

    // standardize route param names

    // titles for pages on the main navigation
    const mainNavTitles = {
        Friends: 'Friends',
        Home: 'Hug Feed',
        Notifications: 'Notifications'
    };

    // collection of headerbuttons to render based on the page
    const headerButtons = {
        Friends: [SearchButton(navigation)],
        Home: [SettingsButton(navigation), CorkboardButton(navigation)],
        Notification: [],
        Profile: [EditButton(navigation)],
    };

    // update header title and buttons whenever user navigates to a different page
    useEffect(() => {

        // update to render main nav header
        if (onMainNav) {
            let currentRoute = getFocusedRouteNameFromRoute(route)
            let title = mainNavTitles[currentRoute]
            setTitle(title)
            let buttons = headerButtons[currentRoute]
            setButtons(buttons)

        // update to render off nav header
        } else if (route.params.page) {
            setTitle('')
            let buttons = [BackButton(navigation), headerButtons[route.params.page]]
            setButtons(buttons)
        }
    }, [route]);

    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            width: windowWidth,
        }, 
        title: {
            fontWeight: 'bold',
            fontSize: 30,
        },
    });
  
    // return new header
    return (
        <View style={styles.header}>
            {buttons ? <HeaderButton {...buttons[0]}/> : <View style={{ width: windowWidth / 8 }}/>}
            {title !== '' && 
                <Text style={styles.title}>{title}</Text>
            }
            {buttons && buttons.length > 1 ? <HeaderButton {...buttons[1]}/> : <View style={{ width: windowWidth / 8 }}/>}
        </View>
    )
}





export default function headerOptions(onMainNav, navigation, route) {
    return {
        header: () => <Header route={route} navigation={navigation} onMainNav={onMainNav}/>,
        headerMode: 'float',
        headerTransparent: true,
    }
}
