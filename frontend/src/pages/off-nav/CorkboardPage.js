import React, {useContext} from 'react'
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import Header from '../../components/Header';
import PinnedHug from '../../components/PinnedHug'
import { DimensionContext } from '../../contexts/DimensionContext';
const corkboardImg = require('assets/corkboard.jpg')
const trashCanImg = require('assets/trashCan.png')

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
    buildTestData("https://picsum.photos/200/201", 'Nov 20, 2020', 'Alex Chow', 0),
    buildTestData("https://picsum.photos/200/199", 'Dec 18, 2018', 'Evan Suong', 1),
    buildTestData("https://picsum.photos/200/198", 'Nov 18, 2020', 'Alana Klopstein', 2),
    buildTestData("https://picsum.photos/199/200", 'May 5, 2017', 'Tyus Liu', 3),
    buildTestData("https://picsum.photos/198/200", 'Jan 8, 2021', 'Vicki Chen', 4),
    buildTestData("https://picsum.photos/199/198", 'Jan 8, 2021', 'Eman Sherif', 5),
    buildTestData("https://picsum.photos/199/199", 'Jan 8, 2021', 'Vuk Radovanovic', 6),
    buildTestData("https://picsum.photos/198/198", 'Jan 8, 2021', 'Evan Serrano', 7),
    buildTestData("https://picsum.photos/198/197", 'Jan 8, 2021', 'Vivian Tang', 8),
    buildTestData("https://picsum.photos/197/198", 'Jan 8, 2021', 'Terry Feng', 9),
    buildTestData("https://picsum.photos/201/200", 'Jan 8, 2021', 'Rickesh Khilnani', 10),
]

/*------- end of testing --------*/

export default function CorkboardPage({ navigation, route }) {
    

    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const margin = windowWidth * 0.03

    return (
        <View style={{ alignItems: 'center' }}>
            

            <Image
                source={corkboardImg}
                style={styles.corkboardImage}
            />
            <Header route={route} navigation={navigation} onMainNav={false}/>

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