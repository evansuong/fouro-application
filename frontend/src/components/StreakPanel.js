import { EBGaramond_500Medium, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Animated
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ReadAPI } from '../API';
import AppStyles from '../AppStyles';
import { UserContext } from '../contexts/UserContext';


/**
 * The streak panel to be showed in the home page with the hug and streak
 * counts. 
 */
export default function StreakPanel(hugs) {
  // const [streakCount, setStreakCount] = useState(3);
  // const [hugCount, setHugCount] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const width = useRef(new Animated.Value(50)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;
  const [userCounts, setUserCounts] = useState({
    hugCount: 0,
    streakCount: 0
  });

  const images = {
    'streakEmoji': require('assets/fireEmoji.png'),
    'hugEmoji': require('assets/hugEmoji.png')
  };

  useEffect(() => {
    ReadAPI.getUserCounts(userData.uid)
    .then(response => {
      if (response.status) {
        setUserCounts({
          hugCount: response.data.hug,
          streakCount: response.data.streak
        });
      } else {
        alert('something went wrong getting your streaks')
      }
    })
  }, [hugs.hugs])

  function handlePress() {
    
    setExpanded(!expanded);
    if (width < 51 && expanded) {
      setExpanded(false);
    }
    if (expanded) {
      collapse();
    } else {
      expand();
    }
  }

  function expand() {
    Animated.spring(width, {
      toValue: 160,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }

  function collapse() {
    Animated.spring(width, {
      toValue: 50,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 0,
      duration: 10,
      useNativeDriver: false,
    }).start();
  }

  let textColor = isLightTheme ? '#FFF' : '#DDD';

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      margin: 10,
      marginBottom: 0,
      paddingVertical: 5,
      backgroundColor: isLightTheme ? 'rgba(0, 0, 0, .6)' : 'rgba(15, 15, 15, .9)', 
      borderRadius: 25,
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
      display: 'flex',
      borderRadius: 12,
    },
    textContainer: {
      width: 85,
      marginHorizontal: 20,
    },
    innerStreakContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 5,
      paddingLeft: 10,
      width: 130,
    },
    image: {
      width: 30, 
      height: 30,
      marginBottom: 5,
    },
    hugImage: {
      marginRight: '10%',
    },
    counts: {
      fontSize: 20,
      color: textColor,
    },
    footer: {
      height: 100,
      alignItems: 'center',
    },
    emojiGroupContainer: {
      alignItems: 'center',
      justifyContent: 'center',  
    },
  });

  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={handlePress}
      >
        <Animated.View style={{ width: width, ...styles.streakContainer}}>

          <View style={styles.innerStreakContainer}> 
            <View style={styles.emojiGroupContainer}>
              <Image
                source={images.hugEmoji}
                style={styles.image}
              />
              <Text style={[styles.counts, styles.hugCount]}>
                {userCounts.hugCount}
              </Text>
            </View>
            <Animated.View opacity={fade}>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 18, color: textColor}}>
                  Hugs Today
                </Text>
              </View>
            </Animated.View>
          </View>

          <View style={styles.innerStreakContainer}>
            <View style={styles.emojiGroupContainer}>
              <Image
                source={images.streakEmoji}
                style={styles.image}
              />
              <Text style={styles.counts}>
                {userCounts.streakCount}
              </Text>
            </View>
            <Animated.View opacity={fade}>
              <View style={styles.textContainer}>
                <Text style={{color: '#FFF', fontSize: 18,}}>
                  Days in a row with 4 Hugs
                </Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}