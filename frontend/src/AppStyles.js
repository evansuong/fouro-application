import { StyleSheet } from 'react-native'
// import '../assets/fonts/Montserrat-Regular.ttf';
import * as Font from 'expo-font';

// TODO: Not sure how to load custom fonts

const AppStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundStyle: {
      flex: 1,
      resizeMode: 'cover',
    },
    onboardingText: {
      // fontFamily: 'Montserrat',
      fontSize: 18,
      marginTop: 25,
      marginBottom: 5,
      marginLeft: 25,
    },
    onboardingInput: {
      marginRight: 20,
      marginLeft: 20,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    linkedButtonContainer: {
      backgroundColor: '#FB7250',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      borderRadius: 10,
    },
    linkedButton: {
      borderRadius: 100,
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
    friendListingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 300,
      height: 50,
      borderRadius: 100,
      backgroundColor: 'rgba(255,0,50,0.8)'
    },
    tinyProfilePic: {
      marginLeft: 20,
      justifyContent: 'center',
      borderRadius: 100,
      width: '13%',
      height: '80%',
      backgroundColor: 'pink'
    }
  });
  
export default AppStyles;