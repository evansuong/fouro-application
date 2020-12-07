import React, { useContext, useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  FlatList, 
  Image, 
  Alert
} from 'react-native'
// APIs
import { ReadAPI } from '../../API'
// Contexts
import { DimensionContext } from 'contexts/DimensionContext'
import { UserContext } from 'contexts/UserContext'
// Custom Components
import FriendCard from 'components/FriendCard'
import Header from 'components/Header'
import SearchPage from '../off-nav/SearchPage'
// Images/Assets
import AppStyles from '../../AppStyles'
import gradient from 'assets/gradients/left.png'
import { getFocusedRouteNameFromRoute, useFocusEffect } from '@react-navigation/native'
// const gradient = require('assets/gradients/left.png');



/*------- testing --------*/
// const pic = 'https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb'

// const [friends, setFriends] = useState([
//   buildFriendData('1', 'Alex Chow', 'alexchow', pic, '#FE5951'),
//   buildFriendData('2', 'Vivian Tang', 'vtang', pic, '#FC6C58'),
//   buildFriendData('3', 'Evan Suong', 'esuong', pic, '#FA7D5D'),
//   buildFriendData('4', 'Evan Serrano', 'eserrano', pic, '#F88E63'),
//   buildFriendData('5', 'Alana Klopstein', 'aklopstein', pic, '#F69D68'),
//   buildFriendData('6', 'Rickesh Khilnani', 'rkhil', pic, '#EFBA7C'),
//   buildFriendData('7', 'Tyus Liu', 'tliu', pic, '#EFCF7C'),
//   buildFriendData('8', 'Vuk Radovanovic', 'vrad', pic, '#EFD67C'),
//   buildFriendData('9', 'Eman Sherif', 'esherif', pic, '#D2CA94'),
//   buildFriendData('10', 'Terry Feng', 'tfeng', pic, '#BCC1A6'),
//   buildFriendData('11', 'Vicki Chen', 'vchen', pic, '#A4B8B9'),
// ]);

// function buildFriendData(id, name, username, profile_pic, color) {
//   return {
//       user_id: id,
//       name: name,
//       username: username,
//       profile_pic: profile_pic,
//       color: color
//   }
// }
/*------- end of testing --------*/


export default function FriendsPage({ navigation, route }) {
    // States
    const [startUp, setStartUp] = useState(true);
    const [friends, setFriends] = useState([]);
    const [friendsPage, setFriendsPage] = useState(false);
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const { userData } = useContext(UserContext);
    const { uid } = userData;
    const routeName = route.name;
    const r = getFocusedRouteNameFromRoute(route)

    async function getFriends() {
        const { status, data } = await ReadAPI.getFriends(uid);
        if (status) {
          if (data.friends.length != friends.length) {
            setFriends(data.friends);
          }
        } else {
          Alert.alert('Something went wrong when retreiving friends list');
        }
    }

    useEffect(() => {
      getFriends();
    }, [])    

    useFocusEffect(() => {
      getFriends();
    }, [r])
  
    const renderCards = friend => {
        // console.log(friend)
        return  <FriendCard
                    friendData={friend.item}
                    // friendData={...friend}
                    navigation={navigation}
                    height={windowHeight / 15}
                    width={windowWidth - 40}
                />        
    }

    const styles = StyleSheet.create({
      navPageContainer: {
        display: 'flex',
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexShrink: 1
      },
      background: {
          position: 'absolute',
          width: windowWidth, 
          height: windowHeight
      },
      friendCard: {
        width: windowWidth, 
        alignItems: 'center', 
        marginTop: 5, 
        paddingBottom: 5
      },
      flatListContainer: {
        display: 'flex', 
        flexShrink: 1
      },
      noFriends: {
        fontSize: 20, 
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center'
      },
      noFriendsContainer: {
        width: windowWidth * 0.7, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
    });

    return (
        <View style={AppStyles.navPageContainer}>
            {/* background */}
            <Image
                source={gradient}
                style={styles.background}
            />
            <View style={{height: windowWidth * 0.27 }}/>
            <Header 
              routeName={routeName} 
              navigation={navigation} 
              onMainNav={true}
            >
              Friends
            </Header>
            {
              friends.length != 0 &&
              <View style={styles.flatListContainer}>
                <FlatList
                  data={friends}
                  keyExtractor={item => item.user_id}
                  renderItem={renderCards}
                  contentContainerStyle={styles.friendCard}
                />
              </View>
            } 
            {
              friends.length == 0 &&
              <View style={styles.noFriendsContainer}>
                <Text style={[
                  styles.noFriends, 
                  {transform: [{ rotate: '90deg'}], fontSize: 50}
                ]}>
                  :(
                </Text>
                <Text style={styles.noFriends}>
                  You don't have any friends. Why don't you search for some!
                </Text>
              </View>
            }
        </View>
    )
}