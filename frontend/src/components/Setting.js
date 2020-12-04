import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const styles = StyleSheet.create({
    icon: {
      resizeMode: "contain",
      width: 50,
      height: 50,
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
