import React, { useState, useContext, useEffect } from 'react'
import { 
  View, 
  StyleSheet, 
  Image, 
  FlatList, 
  Text, 
  Alert,
  ActivityIndicator
} from 'react-native'
// APIs
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import Header from 'components/Header';
import PinnedHug from 'components/PinnedHug';
// Images/Assets
const corkboardImg = require('assets/corkboard.jpg');

function showTrashCan() {
    console.log("CorkboardPage 15 long press")
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
    const [pinnedHugs, setPinnedHugs] = useState();
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    // Misc
    const routeName = route.name;
    const margin = windowWidth * 0.03;

    useEffect(() => {
      load();
    }, [])

    const load = async () => {
      if (startUp) {
        await fetchCorkboard();
        setStartUp(false);
      }
    }

    const fetchCorkboard = async () => {
      const { status, data } = await ReadAPI.buildCorkboard(userData.uid);
      if (status) {
        // console.log('CorkboardPage 82', data);
        setPinnedHugs(data.hugsList);
      } else {
        Alert.alert('Something went wrong when building the corkboard');
      }
    }

    const styles = StyleSheet.create({
      corkboardImage: {
        position: 'absolute',
        resizeMode: 'contain',
        zIndex: 0,
        // TODO: Below css might be problematic for background image size
        height: windowHeight,
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
      contentContainerStyle: {
        paddingBottom: margin, 
        paddingTop: margin + windowWidth * 0.2
      },
      loadingContainer: {
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center'
      }
    })

    if (!pinnedHugs) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large'/>
        </View>
      )
    } else {
      return (
        <View style={{ alignItems: 'center'}}>
            <Image
                source={corkboardImg}
                style={styles.corkboardImage}
            />
            <Header 
              routeName={routeName} 
              navigation={navigation} 
              onMainNav={false}
            />

            {/* Hugs list as a grid */}
            {
              pinnedHugs.length != 0 &&
              <FlatList
                data={pinnedHugs}
                keyExtractor={item => item.hug_ref}
                renderItem={({ item }) => (
                  <PinnedHug
                    navigation={navigation}
                    unpin={showTrashCan}
                    picture={item.image}
                    date={item.dateTime}
                    friendName={item.friendName}
                    id={item.hug_ref}
                  />
                )}
                contentContainerStyle={styles.contentContainerStyle}
                numColumns={2}
              />
            }
            {
              pinnedHugs.length == 0 &&
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
}