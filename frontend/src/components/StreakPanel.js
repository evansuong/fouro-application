import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Animated
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AppStyles from '../AppStyles';


/**
 * The streak panel to be showed in the home page with the hug and streak
 * counts. 
 */
export default function StreakPanel({ mode }) {
  const [streakCount, setStreakCount] = useState(3);
  const [hugCount, setHugCount] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const height = useRef(new Animated.Value(80)).current;
  const fade = useRef(new Animated.Value(0)).current;

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
    console.log('StreakPanel 36', height, expanded);
    if (height < 81 && expanded) {
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
    Animated.spring(height, {
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
    Animated.spring(height, {
      toValue: 80,
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    streakContainer: {
      display: 'flex',
      width: 250,
      backgroundColor: mode == 'light' ? 'white' : 'rgba(0,0,0,0.6)',
      borderRadius: 20,
    },
    innerStreakContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 13,
    },
    image: {
      width: 50, 
      height: 50,
      marginRight: 15,
    },
    hugImage: {
      marginRight: '10%',
    },
    counts: {
      fontSize: 30,
      color: color[mode],
    },
    footer: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
    },
    emojiGroupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
    }
  });
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={handlePress}
      >

        <Animated.View style={[{height: height}, styles.streakContainer]}>

          <View style={[styles.innerStreakContainer, { padding: 0 }]}>
            <View style={styles.emojiGroupContainer}>
              <Image
                source={images.streakEmoji}
                style={styles.image}
              />
              <Text style={styles.counts}>
                {streakCount}
              </Text>
            </View>

            <View style={styles.emojiGroupContainer}>
              <Image
                source={images.hugEmoji}
                style={styles.image}
              />
              <Text style={[styles.counts, styles.hugCount]}>
                {hugCount}
              </Text>
            </View>
          </View>

          <Animated.View
            opacity={fade}
            style={styles.footer}
          >
            <View style={{width: 80, marginLeft: 33.5,}}>
              <Text style={{textAlign: 'center', fontSize: 18,}}>
                Days in a row with 4 Hugs
              </Text>
            </View>

            <View style={{width: 50, marginLeft: 38.5,}}>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                Hugs Today
              </Text>
            </View>
            
          </Animated.View>
          
        </Animated.View>

      </TouchableWithoutFeedback>
    </View>
  );
}