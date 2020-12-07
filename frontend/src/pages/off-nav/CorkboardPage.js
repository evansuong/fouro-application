import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Image, FlatList, Text, Alert } from 'react-native'
// APIs
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
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
    // States
    const [startUp, setStartUp] = useState(true);
    const [pinnedHugs, setPinnedHugs] = useState([]);
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    // Misc
    const routeName = route.name;
    const margin = windowWidth * 0.03;

    useEffect(() => {
      if (startUp) {
        fetchCorkboard();
        // setPinnedHugs(hugList);
        setStartUp(false);
      }
    }, [])

    const fetchCorkboard = async () => {
      const { status, data } = await ReadAPI.buildCorkboard(userData.currentUser.uid);
      // console.log('CorkboardPage 66', status, data);
      if (status) {
        setPinnedHugs(data.hugList.hugsList);
      } else {
        Alert.alert('Something went wrong when building the corkboard');
      }
    }

    const checkPinnedHugs = () => {
      return pinnedHugs.length == 0;
    }

    const styles = StyleSheet.create({
      corkboardImage: {
          position: 'absolute',
          resizeMode: 'contain',
          zIndex: 0
      },
      noPinnedHugs: {
        fontSize: 20, 
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
        color: 'white'
      },
      noPinnedHugsContainer: {
        marginTop: windowHeight * 0.1,
        width: windowWidth * 0.7, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
    })

    return (
        <View style={{ alignItems: 'center'}}>
            <Image
                source={corkboardImg}
                style={styles.corkboardImage}
            />
            <Header routeName={routeName} navigation={navigation} onMainNav={false}/>

            {/* Hugs list as a grid */}
            {
              pinnedHugs && !pinnedHugs.empty &&
              <FlatList
                  // data={testData}
                  data={pinnedHugs}
                  keyExtractor={item => item.hug_ref}
                  renderItem={({ item }) => (
                        <PinnedHug
                          navigation={navigation}
                          unpin={showTrashCan}
                          // picture={hug.item.picture}
                          // date={hug.item.date}
                          // friendName={hug.item.friendName}
                          picture={item.image}
                          date={item.dateTime}
                          friendName={item.friendName}
                          id={item.hug_ref}
                      />
                  )}
                  contentContainerStyle={{
                    paddingBottom: margin, paddingTop: margin + windowWidth * 0.2
                  }}
                  numColumns={2}
              />
            }
            {
              checkPinnedHugs() &&
              <View style={styles.noPinnedHugsContainer}>
                <Text style={[
                  styles.noPinnedHugs, 
                  {transform: [{ rotate: '90deg'}], fontSize: 50}
                ]}>
                  :(
                </Text>
                <Text style={styles.noPinnedHugs}>
                  You don't have any pinned hugs. Why don't you pin some! 
                  If you don't have any hugs, create one!
                </Text>
              </View>
            }        
        </View>
    )
}