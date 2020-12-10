import { EBGaramond_500Medium, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import React, { useState, useContext, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Animated
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AppStyles from '../AppStyles';
import { UserContext } from '../contexts/UserContext';


/**
 * The streak panel to be showed in the home page with the hug and streak
 * counts. 
 */
export default function StreakPanel({ mode }) {
  // const [streakCount, setStreakCount] = useState(3);
  // const [hugCount, setHugCount] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const width = useRef(new Animated.Value(50)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const { userData } = useContext(UserContext);
  const { hugCount, streakCount } = userData.userData;
  console.log("COUNTS STREAKPANEL28", hugCount, streakCount)
  // let hugCount, streakCount = 5;

  const color = {
    light: 'black',
    dark: 'white',
  }

  const images = {
    'streakEmoji': require('assets/fireEmoji.png'),
    'hugEmoji': require('assets/hugEmoji.png')
  };

  function handlePress() {
    
    setExpanded(!expanded);
    console.log('StreakPanel 36', width, expanded);
    if (width < 51 && expanded) {
      console.log('fixing');
      setExpanded(false);
    }
    if (expanded) {
      console.log('collapse');
      collapse();
    } else {
      console.log('expand');
      expand();
    }
  }

  function expand() {
    console.log('EXPANDING')
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
    console.log('COLLAPSING')
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

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      margin: 10,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,  
      elevation: 2,
    },
    streakContainer: {
      display: 'flex',
      borderRadius: 20,
    },
    textContainer: {
      width: 80,
      marginHorizontal: 20,
    },
    innerStreakContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
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
      color: '#FFF',
    },
    footer: {
      height: 100,
      alignItems: 'center',
    },
    emojiGroupContainer: {
      alignItems: 'center',
      justifyContent: 'center',  
    }
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
                source={images.streakEmoji}
                style={styles.image}
              />
              <Text style={styles.counts}>
                {streakCount}
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

          <View style={styles.innerStreakContainer}> 
            <View style={styles.emojiGroupContainer}>
              <Image
                source={images.hugEmoji}
                style={styles.image}
              />
              <Text style={[styles.counts, styles.hugCount]}>
                {hugCount}
              </Text>
            </View>
            <Animated.View opacity={fade}>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 18, color: '#FFF'}}>
                  Hugs Today
                </Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}