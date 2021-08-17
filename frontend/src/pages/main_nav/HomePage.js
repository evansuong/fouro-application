import React, { useState, useRef, useEffect, useContext } from 'react'
import { 
  StyleSheet, 
  Button, 
  Text, 
  View, 
  Animated,
  TouchableWithoutFeedback,
  Image,
  Alert,
  FlatList
} from 'react-native';
import AppStyles from '../../AppStyles';
// APIs
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import HugCard from 'components/HugCard';
import Panel from 'components/StreakPanel';
import Header from 'components/Header';
import gradient from 'assets/gradients/middle.png';
import { useFocusEffect } from '@react-navigation/native';
import StreakPanel from '../../components/StreakPanel';
// const gradient = require('assets/gradients/middle.png')



/*------- testing --------*/

const pic = "https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb"

const testData = [
  buildTestData('Vicki', 'do you remember', pic, 1), 
  buildTestData('Ricky', 'the 21st night of september Chow', pic, 2),
  buildTestData('Alex', 'soulja boy tellem', undefined, 3),
  buildTestData('Evan', 'nobody \n \n\npray for\n me if t\nhey n\no\n\n\n\n\n\nt \n there \n \n \n for me', pic, 4),
  buildTestData('Vivian', 'weeeeeeeeeeelll yea yea', pic, 5),
]

function buildTestData(name, text, img, id) {
  return {
    friend_name: name,
    message: text,
    image: img,
    hug_id: id,
  }
}

/*------- end of testing --------*/




export default function HomePage({ navigation, route, refresh }) {
  // States
  const [expanded, setExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [hugArray, setHugArray] = useState([]);
  const [isFocused, setIsFocused] = useState();
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData, dispatch } = useContext(UserContext);
  const { isLightTheme } = userData;
  // Misc
  const width = useRef(new Animated.Value(60)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const animationDuration = 150;
  const routeName = route.name;

  useEffect(() => {
    fetchHugs();
  }, [refresh])

  const fetchHugs = async () => {
    console.log('fetching hugs homepage80')
    const { status, data } = 
      await ReadAPI.getUserHugs(userData.uid);
    if (status) {
      setHugArray(data.userHugs);
    } else {
      Alert.alert('Something went wrong when fetching hugs');
    }
  }

  function handlePress() {
    setExpanded(!expanded);
    if (expanded) {
      navigation.navigate('Hug Search Page');
      collapse();
    } else {
      expand();
    }
  }

  function dismissCreateButton() {
    setExpanded(false);
    collapse();       
  }

  function expand() {
    Animated.spring(width, {
      toValue: 175,
      duration: animationDuration,
      bounciness: 1,
      speed: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 1,
      duration: animationDuration + 700,
      useNativeDriver: false,
    }).start();
  }

  function collapse() {
    Animated.spring(width, {
      toValue: 60,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 0,
      duration: animationDuration - 100,
      useNativeDriver: false,
    }).start();
  }

  let backgroundColor = isLightTheme ? '#FB7250': 'rgba(0,0,0,0.5)';
  let padding = expanded ? 15 : 0;
  let paddingLeft = expanded ? 15 : '48%';

  const renderCards = data => {
    let hugData = data.item;
    return (
      <HugCard 
        key={hugData.hug_id} 
        navigation={navigation}
        data={{...hugData}}
        image={hugData.image}
      />
    )
  }

  const func = () => {
    console.log("yooooo");
  }

  const styles = StyleSheet.create({
    createHugButtonContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      right: 10,
      borderRadius: 50,
      height: 60,
      color: 'white',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { height: 2, width: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,  
          elevation: 2,
        },
        android: {
          elevation: 0,
        },
      }),
    },
    streakContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
    createHugText: {
      fontSize: 20,
      color: isLightTheme ? '#FFF' : '#DDD',
    },
    background: {
      position: 'absolute',
    },
    flatListContainer: {
      alignItems: 'center', 
      paddingTop: 10, 
      width: windowWidth,
    }
  })  


  return (
    <View style={AppStyles.navPageContainer}>
      {/* background */}
      <Image
        source={gradient}
        style={AppStyles.background}
      />

      <Header 
        routeName={'Hug Feed'} 
        navigation={navigation} 
        onMainNav={true}
      >
        Hug Feed
      </Header>

      <View style={{marginTop: 100}}></View>

      {/* Hug Cards */}
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={hugArray}
        keyExtractor={ item => item.hug_id}
        renderItem={renderCards}
        onRefresh={fetchHugs}
        refreshing={false}
      />

      <View style={styles.streakContainer}>
        <StreakPanel hugs={hugArray.length}/> 
      </View>

      {
        expanded ?
        <TouchableWithoutFeedback
        onPress={dismissCreateButton}>
          <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            width: 600,
            height: 800,}}
          ></View>
        </TouchableWithoutFeedback> : <></>
      }

      {/* Create Hug Button */}
      <TouchableWithoutFeedback
        onPress={handlePress}
      >
        <Animated.View style={{
          ...styles.createHugButtonContainer, 
          width:width, 
          backgroundColor: isLightTheme ? 'rgba(0, 0, 0, .6)' : 'rgba(15, 15, 15, .9)', 
          padding: padding, 
          paddingLeft: paddingLeft, 
          zIndex: 101
        }}>
          <Text style={styles.createHugText}>
            +
          </Text>

          <Animated.View opacity={fade}>
            <Text style={styles.createHugText}>
              Create Hug
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}
