import React, { useState, useContext }  from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Custom Components
import LinkedButton from 'components/LinkedButton';
// Images/Assets
import { LinearGradient } from 'expo-linear-gradient';

export default function QuestionPage({ navigation }) {
  // States
  const [value, setValue] = useState(1);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);

  const styles = StyleSheet.create({
    title: {
      marginTop: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
    background: {
      position: 'absolute',
      width: '100%',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight,
    },
    quoteBody: {
      marginTop: 20,
      marginHorizontal: 30, 
      padding: 15,   
      backgroundColor: '#FB7250',
      borderRadius: 10,
      marginBottom: 20,
    },
    quote: {
      fontStyle: 'italic',
      fontSize: 15,
      color: 'white',
    },
    byLine: {
      textAlign: 'right',
      fontStyle: 'italic',
      fontSize: 15,
      color: 'white',
    },
    body: {
      marginTop: 0,
      marginHorizontal: 25, 
      padding: 10, 
      fontSize: 15,
    },
    outerContainer: {
      height: '100%'
    },
    sliderContainer: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginBottom: 40,
    },
    sliderStyle: {
      width: 200, 
      height: 40,
    },
    scrollViewContainer: {
      paddingBottom: 10
    }
  });

  return (
    <View style={styles.outerContainer}>
      
      {/* gradient background */}
      <View style={styles.background}>
        <LinearGradient
            colors={['#FFFFFF','#FFFFFF']}
            start={[0.9, 0.1]}
            end={[0.1, 0.7]}
            style={styles.linearGradient}
        />
      </View>
      
      <ScrollView 
        bounces="false" 
        contentContainerStyle={styles.scrollViewContainer}
      >
        <Text style={styles.title}>
          Welcome to Fouro!
        </Text>
      
        <View style={styles.quoteBody}>
          <Text style={styles.quote}> 
            We need four hugs a day for survival. We
            need eight hugs day for maintenance. We need
            twelve hugs a day for growth.
          </Text>
          <Text style={styles.byLine}>
            -Virginia Satir
          </Text>
        </View>

        <View>
          <Text style={styles.body}>
            Fouro is an app designed to help you keep track of 
            the hugs you receive each day so that you can make sure 
            you're getting at least four hugs each day. 
          </Text>
          <Text style={styles.body}>
            While a physical hug is not always possible, especially during 
            the ongoing pandemic, we like to define a hug as a meaningful 
            interaction between two people wherein each person benefits in 
            an emotionally uplifting way.   
          </Text>
          <Text style={styles.body}>
            This can be two friends catching up over coffee, chatting over 
            zoom, or even conversing over text. If you feel like you've been 
            hugged, you can log it here!
          </Text>
          <Text style={styles.body}>
            Here at Fouro, we believe that setting goals for yourself can be 
            a good way to start: how many hugs do you hope to send or receive
            each day? We recommend at least four!
          </Text>
        </View>

        <View vertical={true} style={styles.sliderContainer}>
          <Slider
              style={styles.sliderStyle}
              value={value}
              onValueChange={(value) => setValue( value )}
              minimumValue={1}
              maximumValue={20}
              minimumTrackTintColor="#8677E5"
              maximumTrackTintColor="#E57777"
              step={1}
            />
          <Text>Hug goal per day: {value}</Text>
        </View>
        

        <View style={styles.navigationButton}>
          <LinkedButton
            navigation={navigation}
            link='Main Nav Page'
            text='Get Started!'
            color='#FFC24A'
          />
        </View>
      </ScrollView>
    </View>
  );
}