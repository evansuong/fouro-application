import React, { useContext, useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
import { ReadAPI } from '../../API';
import Header from '../../components/Header';



/*------- testing --------*/

const pic = 'https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb'

// when we actually pass info to the OtherUserProfilePage, just append isStranger and isPending to the end
const testFriendData = [
  {user_id: 1, name: 'e', username: 'a', pfp: pic, isStranger: false, isPending: false},
  {user_id: 2, name: 'eva', username: 'al', pfp: pic, isStranger: false, isPending: false},
  {user_id: 3, name: 'eva', username: 'ale', pfp: pic, isStranger: false, isPending: false},
  {user_id: 4, name: 'evan', username: 'alex', pfp: pic, isStranger: false, isPending: false},
  {user_id: 5, name: 'evans', username: 'alexc',pfp: pic, isStranger: false, isPending: false},  
  {user_id: 6, name: 'evansu', username: 'alexch', pfp: pic, isStranger: false, isPending: false},
  {user_id: 7, name: 'evansuo', username: 'alexchow',pfp: pic, isStranger: false, isPending: false},
  {user_id: 8, name: 'evansuon', username: 'alexchowmein',pfp: pic, isStranger: false, isPending: false},
  {user_id: 9, name: 'evansuong', username: 'alexchowmei', pfp: pic, isStranger: false, isPending: false},
  {user_id: 10, name: 'evansuong', username: 'alexchowmen', pfp: pic, isStranger: false, isPending: false},
]

// again, pass 
const testStrangerData = [
  {user_id: 1, name: 's', username: 'a', pfp: pic, isStranger: true, isPending: false},
  {user_id: 2, name: 'su', username: 'al', pfp: pic, isStranger: true, isPending: true},
  {user_id: 3, name: 'suo', username: 'ale', pfp: pic, isStranger: true, isPending: false},
  {user_id: 4, name: 'suon', username: 'alex', pfp: pic, isStranger: true, isPending: false},
  {user_id: 5, name: 'suong', username: 'alexc', pfp: pic, isStranger: true, isPending: true},
  {user_id: 6, name: 'suonge', username: 'alexch', pfp: pic, isStranger: true, isPending: false},
  {user_id: 7, name: 'suongev', username: 'alexcho', pfp: pic, isStranger: true, isPending: true},
  {user_id: 8, name: 'suongeva', username: 'alexchow', pfp: pic, isStranger: true, isPending: true},
  {user_id: 9, name: 'suongevan', username: 'alexchowm', pfp: pic, isStranger: true, isPending: false},
  {user_id: 10, name: 'suongevan', username: 'alexchowme', pfp: pic, isStranger: true, isPending: false},
]

/*------- end of testing --------*/





export default function SearchPage({ input, navigation }) {
  // States
  const [userList, setUserList] = useState([]);
  const [searchFriends, setSearchFriends] = useState(true);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  const { isLightTheme, uid } = userData;
  const Tab = createMaterialTopTabNavigator();

  function search() {
    if (searchFriends) {
      ReadAPI.searchFriends(uid, input).then(response => {
          setUserList(response.data.friends)
        }
      )
    } else {
      ReadAPI.searchUsers(uid, input).then(response => {
        if (response.data.user.length != 0) {
          setUserList([response.data.user])
        }
      }
      )
    }
  }
  
  useEffect(() => {
    if (input === '') {
      setUserList([]);
    } else {
      search();
    }
  }, [input, searchFriends])

  function searchStrangersList({ route }) {
    useFocusEffect(() => {
      setSearchFriends(false);
    })

    function viewStranger(userData) {
      navigation.navigate('Friend Profile', 
      { 
        data: Object.assign(
          {}, 
          { 
            otheruser_id: userData.user_id, 
            profile_pic: userData.pfp, ...userData 
          }
        )
      });
    }

    let textColor = isLightTheme ? '#000' : '#FFF';
    let borderColor = isLightTheme ? '#FFF' : '#555';
    let backgroundColor = isLightTheme ? '#FFF' : '#333'

    return (
      <View>
        <Header navigation={navigation} routeName={'Search Page'} onMainNav={false}/>
        <TextInput
          keyboardType='web-search' 
          onChangeText={(val) => setSearchInput(val)}
          autoCapitalize='none'
          placeholder="search username"
        />
        {userList.length > 0 && userList[0] ? 
        <ScrollView style={{ backgroundColor: backgroundColor }}>
          {userList.map(userData => {
            return (
            <TouchableOpacity 
              key={userData.user_id} 
              onPress={() => viewStranger(userData)}
            >
              <View style={{
                ...styles.userCard, 
                borderBottomColor: borderColor
              }}>
                <Image 
                  style={styles.profPic} 
                  source={{ uri: userData.profile_pic }}
                /> 
                <Text style={{
                  ...styles.userText, 
                  color: textColor
                }}>
                  {userData.name}
                </Text>
              </View>
            </TouchableOpacity>
          )})}
        </ScrollView> : <></>}
      </View>
    )
  }

  function searchFriendList({ route }) {
      useFocusEffect(() => {
          setSearchFriends(true)
      })

      function viewUser(userData) {
          navigation.navigate('Friend Profile', 
          { 
            data: Object.assign(
              {}, 
              { 
                otheruser_id: userData.user_id, 
                profile_pic: userData.pfp, 
                ...userData 
              }
            )
          })
      }

      let textColor = isLightTheme ? '#000' : '#FFF';
      let borderColor = isLightTheme ? '#FFF' : '#555';
      let backgroundColor = isLightTheme ? '#FFF' : '#333'

      return (
          userList && userList.length > 0 ?
          <ScrollView style={{backgroundColor: backgroundColor}}>
          {userList.map(userData => (
              <TouchableOpacity 
                key={userData.user_id} 
                onPress={() => viewUser(userData)}
              >
                  <View style={{
                    ...styles.userCard, 
                    borderBottomColor: borderColor 
                  }}>
                      <Image 
                        style={styles.profPic} 
                        source={{ uri: userData.profile_pic }}
                      /> 
                      <Text style={{
                        ...styles.userText, 
                        color: textColor 
                      }}>
                        {userData.name}
                      </Text>
                  </View>
              </TouchableOpacity>
          ))}
          </ScrollView> : <></>
      )
  }

  let backgroundColor = isLightTheme ? '#FFF' : '#rgb(40, 40, 40)';

  const styles = StyleSheet.create({
    userCard: {
        padding: 10,
        borderBottomColor: '#BBB',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    userText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    profPic: {
        borderRadius: 100,
        width: windowWidth / 10, 
        height: windowWidth / 10,
    },
    mainContainer: {
      width: windowWidth / 1.1, 
      height: windowHeight / 1.4
    },
    tabNavigator: {
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20
    }
  })

    return (
        <View style={styles.mainContainer}>
            <Tab.Navigator 
                style={styles.tabNavigator}
                tabBarOptions={{
                    activeTintColor: isLightTheme ? 'purple' : '#E57777',
                    style: { backgroundColor: backgroundColor },
                    indicatorStyle: { 
                        backgroundColor: isLightTheme ? 'purple' : '#E57777',
                    }
                }}>
                <Tab.Screen 
                  name="Friends" 
                  component={searchFriendList}
                />
                <Tab.Screen 
                  name="Users" 
                  component={searchStrangersList}
                />
            </Tab.Navigator>
        </View>
    )
}