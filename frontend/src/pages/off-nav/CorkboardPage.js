import React, { useState, useContext } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
// APIs
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import UserContext from 'contexts/UserContext';
// Custom Components
import Header from 'components/Header';
import PinnedHug from 'components/PinnedHug'
// Images/Assets
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
    const [startUp, setStartUp] = useState(true);
    const [pinnedHugs, setPinnedHugs] = useState([]);

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);

    const routeName = route.name;

    const margin = windowWidth * 0.03;

    // useEffect(() => {
    //   if (!startUp) {
    //     const { hugList } = await ReadAPI.buildCorkboard(userData.uid);
    //     setPinnedHugs(hugList);
    //     setStartUp(false);
    //   }
    // }, [])

    return (
        <View style={{ alignItems: 'center'}}>
            <Image
                source={corkboardImg}
                style={styles.corkboardImage}
            />
            <Header routeName={routeName} navigation={navigation} onMainNav={false}/>

            {/* Hugs list as a grid */}
            <FlatList
                data={testData}
                // data={pinnedHugs}
                // keyExtractor={item => item.hugId}
                renderItem={( hug ) => (
                    <PinnedHug
                        navigation={navigation}
                        unpin={showTrashCan}
                        picture={hug.item.picture}
                        date={hug.item.date}
                        friendName={hug.item.friendName}
                        // picture={hug.image}
                        // date={hug.dateTime}
                        // friendName={hug.friendName}
                        // id={hug.hugId}
                    />
                )}
                contentContainerStyle={{
                  paddingBottom: margin, paddingTop: margin + windowWidth * 0.2
                }}
                numColumns={2}
            />                
        </View>
    )
}

const styles = StyleSheet.create({
    corkboardImage: {
        position: 'absolute',
        resizeMode: 'contain',
        zIndex: 0
    }
})