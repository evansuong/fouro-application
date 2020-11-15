import { StyleSheet } from 'react-native'
// import '../assets/fonts/Montserrat-Regular.ttf';
import * as Font from 'expo-font';

// TODO: Not sure how to load custom fonts

const AppStyles = StyleSheet.create({
    container: {
      display: 'flex',
      // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    backgroundStyle: {
      flex: 1,
      resizeMode: 'cover',
    }, 
  });
  
export default AppStyles;