import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";
// import removeFriend from '../../pages/off-nav/FriendProfilePage'


function removeFriend() {
    console.log("removing friend");
}

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
                    buttonStyle={ styles.optionsMenuButton }
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
    optionsMenuButton: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
        marginRight: 0,
        //top: 15, // the wherever, top margin
        // right: -5, // the wherever, right margin. still don't know why it's neg
        //backgroundColor: 'pink'
    },
    backButton: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
        //backgroundColor: 'pink'
    },
    header: {
        // position: 'absolute',
        padding: 10,
        paddingTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});