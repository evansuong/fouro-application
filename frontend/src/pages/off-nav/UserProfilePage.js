import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../components/Header";
import Setting from "../../components/Setting";
import UserProfile from "../../components/UserProfile";
import { DimensionContext } from "../../contexts/DimensionContext";

export default function UserProfilePage({ navigation, route }) {
  const pfp = require("assets/fillerProfilePic.jpg");

  const { windowWidth, windowHeight } = useContext(DimensionContext);

  const topMarginSize = windowWidth * 0.1;
  const settingMarginTopBottom = windowWidth * 0.03;
  const buttonMargin = 10
  const buttonHeight = 50
  const routeName = route.name;

  const styles = StyleSheet.create({
    settingsContainer: {
      width: windowWidth,
      marginTop: settingMarginTopBottom,
      borderTopWidth: 1,
      borderColor: "#D4D4D4",
    },
    button: {
      backgroundColor: 'orange',
      height: buttonHeight,
      width: windowWidth - buttonMargin,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: buttonMargin,
      marginBottom: windowHeight / 20,
    },
    buttonText: {
      color: 'white',
      fontSize: windowWidth * 0.05,
      fontWeight: 'bold'
    }
  });

  function goToResetPwdPage() {
    navigation.navigate('Reset Password Page')
  }

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Header routeName={routeName} navigation={navigation} onMainNav={false} />

      <View style={{ marginTop: topMarginSize }}>
        <UserProfile
          routeName={"User Profile Page"}
          profilePicture={pfp}
          userFirstLast={"Dummy One"}
          username={"iamnumberone"}
        />

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Settings section */}
          <View style={styles.settingsContainer}>
            <Setting
              icon={require("assets/resetPassword.png")}
              text="Reset Password"
              onPress={goToResetPwdPage}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />

            <Setting
              icon={require("assets/deleteAccount.png")}
              text="Delete Account"
              textColor="red"
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}
