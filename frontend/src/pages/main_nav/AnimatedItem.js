import React, { useEffect } from 'react'
import {
    Animated,
    Dimensions,
    Image,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

export default function AnimatedItem() {


    const width = Dimensions.get('window').width;
    const animatedValue = new Animated.Value(0);
    
    useEffect(() => 
        Animated.timing(
            animatedValue,
            {
                toValue: 0.5,
                duration: 510,
                useNativeDriver: true
            }
        ).start(() => {
            props.afterAnimationComplete();
        })
    , [])

        
    const deleteItem = () => {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 510,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.deleteItem(this.props.item.id);
        });
    }


    function shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item.id !== this.props.item.id) {
            return true;
        }
        return false;
    }
 
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const translate_Animation_Object = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-width, 0, width]
      });
   
      const opacity_Animation_Object = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      });
   
      return (
        <Animated.View style={[
          styles.singleItemView, {
            transform: [{ translateX: translate_Animation_Object }],
            opacity: opacity_Animation_Object
          }]}>
   
          <Text style={styles.singleItemText}>
   
            Item {this.props.item.text}
   
          </Text>
   
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={this.deleteItem}>
            <Text style={styles.removeIcon}>{'\u00D7'}</Text>
   
          </TouchableOpacity>
   
        </Animated.View>
    )
}
