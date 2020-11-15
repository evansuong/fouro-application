import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkedButton from 'components/LinkedButton';


export default function QuestionPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>
          Question Page
        </Text>
      </View>
      
      <View style={styles.body}>
        <Text style={{textAlign: 'center'}}>
          Needs to be a scrollable list
          of questions or have large-sized questions
          that will dynamically change (ie question 1
          will transition to question 2 on the same page).
          CANNOT have multiple question pages.
        </Text>
      </View>
      

      {/* Merely for navigation purposes. 
      Remove when designing questions. */}
      <View style={styles.navigationButton}>
        <LinkedButton
          navigation={navigation}
          link='Main Nav Page'
          text='SUBMIT'
          color='#FFC24A'
        />
      </View>
      {/* Merely for navigation purposes. 
      Remove when designing questions. */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  body: {
    marginTop: 20,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});