import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
// APIs
import { ReadAPI } from '../../API';
// Contexts
import { DimensionContext } from "contexts/DimensionContext";
import { UserContext } from "contexts/UserContext";
// Custom Components
import Header from "components/Header";
import Setting from "components/Setting";
import UserProfile from "components/UserProfile";

export default function UserProfilePage({ navigation, route }) {
  // States
  const [fetchedUser, setFetchedUser] = useState();
  const [startUp, setStartUp] = useState(true);
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData, dispatch } = useContext(UserContext);
  const isLightTheme = true;
  // Misc
  const topMarginSize = windowWidth * 0.1;
  const settingMarginTopBottom = windowWidth * 0.03;
  const buttonMargin = 10
  const buttonHeight = windowHeight * .07
  const routeName = route.name;

  useEffect(() => {
    if (startUp) {
      setStartUp(false);
      fetchUserData();
    }
  }, [])

  const fetchUserData = async () => {
    const { status, data } = 
      await ReadAPI.getUserProfile(userData.uid);
    if (status) {
      setFetchedUser(data);
    } else {
      Alert.alert('Something went wrong when fetching user data');
    }
  }

  const styles = StyleSheet.create({
    settingsContainer: {
      width: windowWidth,
      marginTop: settingMarginTopBottom,
      borderTopWidth: 1,
      borderColor: "#D4D4D4",
    },
    button: {
      backgroundColor: '#E57777',
      height: buttonHeight,
      width: windowWidth * .85,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      margin: buttonMargin,
      marginBottom: windowHeight / 20,
      shadowColor: '#000',
      shadowOffset: {
          width: 5,
          height: 6,
      },
      shadowOpacity: 0.22,
      shadowRadius: 3,
      elevation: 14,
    },
    buttonText: {
      color: 'white',
      fontSize: windowWidth * 0.05,
    },
    container: {
      backgroundColor: isLightTheme ? '#EEE' : '#000',
      display: "flex", 
      alignItems: "center",
      fontFamily: 'Montserrat_500Medium',
    },
    profileContainer: {
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      alignItems: 'center',
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: windowHeight
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

  function logOut() {
    if (userData.userData) {
      dispatch({
        type: 'LOG_OUT',
        payload: {}
      })
      Alert.alert('Logged out!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Launch Page'}],
      });
    } else {
      Alert.alert('userData.userData is undefined. You\'re not logged in!');
    }
  }

  if (!fetchedUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large'/>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Header 
          routeName={routeName} 
          navigation={navigation} 
          onMainNav={false} 
        />

        <View style={{ marginTop: topMarginSize }}>
          <UserProfile
            routeName={"User Profile Page"}
            profilePicture={fetchedUser.profile_pic}
            userFirstLast={fetchedUser.name}
            username={fetchedUser.username}
          />

          <View style={styles.profileContainer}>
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
                icon={require("assets/sun.png")}
                text="Toggle Theme"
                textColor="black"
                onPress={toggleTheme}
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
              <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}
