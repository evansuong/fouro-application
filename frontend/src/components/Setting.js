import React, { useContext } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from "react-native";
// Contexts
import { UserContext } from 'contexts/UserContext';

export default function Setting({
  icon,
  text,
  textColor,
  onPress,
  windowWidth,
  windowHeight,
}) {
  // onPress

  const settingMarginSides = windowWidth * 0.05;
  const settingMarginTopBottom = windowWidth * 0.03;
  const descMargin = windowWidth * 0.03;
  const fontColor = textColor == undefined ? "black" : textColor;
  
  const { userData } = useContext(UserContext);
  const { isLightTheme } = userData;

  const styles = StyleSheet.create({
    icon: {
      resizeMode: "contain",
      width: 50,
      height: 50,
      color: 'red'
    },
    iconDescGroup: {
      flexDirection: "row",
      alignItems: "center",
    },
    setting: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: settingMarginSides,
      marginRight: settingMarginSides,
      marginTop: settingMarginTopBottom,
      padding: 5,
      backgroundColor: '#EEE',
    },
    desc: {
      marginLeft: descMargin,
      color: fontColor,
    },
  });

  return (
    <TouchableOpacity style={styles.setting} onPress={onPress}>
      <View style={styles.iconDescGroup}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.desc}>{text}</Text>
      </View>
      <Text>{">"}</Text>
    </TouchableOpacity>
  );
}
