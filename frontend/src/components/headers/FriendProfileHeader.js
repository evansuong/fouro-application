import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";
import removeFriend from '../../pages/off-nav/FriendProfilePage'

const {screenHeight, screenWidth} = Dimensions.get('window');

//comment
export default function Header({ navigation }) {

    const icon = require("assets/overflowMenuIcon.png");
    const backButton = require("assets/backButton.png");

    return (
        /* Overall header wrapper */
        <View style={ styles.header }>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image 
                    source={backButton}
                    style={styles.backButton}
                />
            </TouchableOpacity>
            {/* option overflow button (remove friend button) */}
            <View style={ styles.removeFriendOverlay }>
                {/* add a 'close' option */}
                <OptionsMenu
                    button={ icon }
                    buttonStyle={ styles.button }
                    options={["remove friend"]}
                    actions={[removeFriend]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    removeFriendOverlay: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    button: {
        //position: 'absolute', // now we can place it wherever
        width: 30,
        height: 30,
        resizeMode: 'contain',
        //top: 15, // the wherever, top margin
        right: -5 // the wherever, right margin. still don't know why it's neg
    },
    backButton: {
        width: 30,
        height: 30
    },
    header: {
        position: 'absolute',
        padding: 15,
        paddingTop: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginTop: 10,
        marginBottom: 20
    },
});