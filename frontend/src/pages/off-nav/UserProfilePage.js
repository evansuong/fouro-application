import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../components/Header";
import Setting from "../../components/Setting";
import UserProfile from "../../components/UserProfile";
import { DimensionContext } from "../../contexts/DimensionContext";
import { UserContext } from "../../contexts/UserContext";

export default function UserProfilePage({ navigation, route }) {
  const pfp = 'https://firebasestorage.googleapis.com/v0/b/cafe-fouro.appspot.com/o/profile_pictures%2FPhoto%20on%203-30-20%20at%205.34%20PM.jpg?alt=media&token=478c304d-37e4-463e-a821-b817b6119edb'

  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { dispatch } = useContext(UserContext);

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

  function toggleTheme() {
    dispatch({
      type: "TOGGLE_THEME",
    })
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

            <Setting
              icon={require("assets/deleteAccount.png")}
              text="Toggle Theme"
              textColor="black"
              onPress={toggleTheme}
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
