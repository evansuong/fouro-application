import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppStyles from '../AppStyles';


/**
 * The streak panel to be showed in the home page with the hug and streak
 * counts. 
 */
export default function StreakPanel() {
  // TODO: Hard-coded state values
  const [streakCount, setStreakCount] = useState(3);
  const [hugCount, setHugCount] = useState(5);

  // const fetchUser = async () => {
  //   const response = await db.collection('users').where('first_name', '==', 'Donald');
  //   const data = await response.get();
  //   if (data.empty) {
  //     console.log('empty')
  //     return;
  //   }
  //   let res = [];
  //   data.forEach(doc => {
  //     res.push(doc.data());
  //   })
  //   console.log(res[0]);
  // }

  // UNCOMMENT WHEN WE CAN COMMUNICATE WITH BACKEND
  // useEffect(() => {comment
  //   fetchUser();
  // }, [/* dependecies */])

  const images = {
    'streakEmoji': require('../../assets/fireEmoji.png'),
    'hugEmoji': require('../../assets/hugEmoji.png')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        <View style={styles.innerStreakContainer}>
          <Image
            source={images.streakEmoji}
            style={styles.image}
          />
          <Text style={styles.counts}>
            {streakCount}
          </Text>
          <Image
            source={images.hugEmoji}
            style={styles.image}
          />
          <Text style={[styles.counts, styles.hugCount]}>
            {hugCount}
          </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 40,
    alignItems: 'center',
  },
  streakContainer: {
    width: 250,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100,
  },
  innerStreakContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 50, 
    height: 50
  },
  hugImage: {
    marginRight: '10%',
  },
  counts: {
    fontSize: 30,
    color: 'white',
  },
  hugCount: {
    marginRight: '10%',
  }
});
