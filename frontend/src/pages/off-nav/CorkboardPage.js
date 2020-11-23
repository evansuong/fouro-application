import React, {useContext} from 'react'
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import PinnedHug from '../../components/PinnedHug'
import { DimensionContext } from '../../contexts/DimensionContext';

function showTrashCan() {
    console.log("long press")
}

/*------- testing --------*/
function buildTestData(picture, date, friendName, id) {
    return {
        picture: picture,
        date: date,
        friendName: friendName,
        id: id,
    }
}

const testData = [
    buildTestData("https://picsum.photos/200/200", 'Nov 20, 2020', 'Alex Chow', 0),
    buildTestData("https://picsum.photos/200/200", 'Dec 18, 2018', 'Evan Suong', 1),
    buildTestData("https://picsum.photos/200/200", 'Nov 18, 2020', 'Yixuan Zhou', 2),
    buildTestData("https://picsum.photos/200/200", 'May 5, 2017', 'Tyus Liu', 3),
    buildTestData("https://picsum.photos/200/200", 'Jan 8, 2021', 'Vicki Chen', 4),
]

/*------- end of testing --------*/

export default function CorkboardPage({ navigation }) {
    const corkboardImg = require('assets/corkboard.jpg')
    const trashCanImg = require('assets/trashCan.png')

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const margin = windowWidth * 0.03

    return (
        <View style={{ alignItems: 'center' }}>

            <Image
                source={corkboardImg}
                style={styles.corkboardImage}
            />

            {/* Hugs list as a grid */}
            <FlatList
                data={testData}
                renderItem={( hug ) => (
                    <PinnedHug
                        navigation={navigation}
                        unpin={showTrashCan}
                        picture={hug.item.picture}
                        date={hug.item.date}
                        friendName={hug.item.friendName}
                    />
                )}
                contentContainerStyle={{paddingBottom: margin, paddingTop: margin}}
                numColumns={2}
            />

            {/* <Image
                source={trashCanImg}
                style={styles.trashCanImage}
            /> */}
                
        </View>
    )
}

const styles = StyleSheet.create({
    corkboardImage: {
        position: 'absolute',
        resizeMode: 'contain',
        zIndex: 0
    },
    trashCanImage: {
        position: 'absolute',
        width: 70,
        height: 70,
        bottom: 10,
        backgroundColor: 'pink',
        zIndex: 1,
        borderRadius: 100
    }
})