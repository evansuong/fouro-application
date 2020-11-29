import { Dimensions, StyleSheet } from 'react-native'
// import '../assets/fonts/Montserrat-Regular.ttf';
import * as Font from 'expo-font';

// TODO: Not sure how to load custom fonts

const AppStyles = StyleSheet.create({
    navPageContainer: {
      display: 'flex',
      backgroundColor: 'transparent',
      height: '100%',
      alignItems: 'center',
    },
    background: {
      position: 'absolute',
      width: Dimensions.get('window').width + 1,
      height: Dimensions.get('window').height,
    }, 
  });
  
export default AppStyles;