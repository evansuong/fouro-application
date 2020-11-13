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
    }
  });
  
export default AppStyles;