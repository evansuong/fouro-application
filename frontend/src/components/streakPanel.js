import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { db, users } from 'backend/routes/users';
import AppStyles from '../AppStyles';


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
  // useEffect(() => {
  //   fetchUser();
  // }, [/* dependecies */])

  const images = {
    'streakEmoji': require('../../assets/fireEmoji.png'),
    'hugEmoji': require('../../assets/hugEmoji.png')
  };
  
  return (
    <View style={styles.container}>
      <View style={AppStyles.streakContainer}>
        <View style={AppStyles.innerStreakContainer}>
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