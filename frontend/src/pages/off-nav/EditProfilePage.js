import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
// APIs
import AuthAPI from '../../authentication/Authentication';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from "components/CustomTextField";
import Header from "components/Header"


export default function EditProfilePage({ navigation, route }) {
  // States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  // Contexts
  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const { userData } = useContext(UserContext);
  // Misc
  const buttonMargin = 10;
  const buttonHeight = 50;
  const topMarginSize = windowWidth * 0.1 + 5;
  const routeName = route.name

  function firstNameEmpty() {
    return firstName === "";
  }

  function lastNameEmpty() {
    return lastName === "";
  }

  function usernameEmpty() {
    return username === "";
  }

  function fieldsValid() {
    return !firstNameEmpty() && 
    !lastNameEmpty() &&
    !usernameEmpty()
  }

  function reset() {
    Alert.alert('(NOT SET UP) Reset button pressed!');
    // const { status, data } = 
    //   await AuthAPI.changePassword(userData.uid, newPassword);
    // navigation.replace('User Profile Page');
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: fieldsValid() ? 'orange' : 'gray',
      height: buttonHeight,
      width: windowWidth - buttonMargin,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      margin: buttonMargin,
    },
    buttonText: {
      color: "white",
      fontSize: windowWidth * 0.05,
      fontWeight: "bold",
    },
    header: {
      marginTop: topMarginSize,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    warning: {
      color: 'red'
    },
    formContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    }
  });

  return (
    <View style={styles.formContainer}>
      
      <Header routeName={routeName} navigation={navigation} onMainNav={false} />

      <View style={{ width: '100%' }}>
        <Text style={styles.header}>
          Edit Profile
        </Text>
        {/* Old Password Input Field */}
        <ScrollView>
        <CustomTextField
          titleText="First Name"
          setField={setFirstName}
          secureText={true}
          required={true}
        />
        {/* New Password Input Field */}
        <CustomTextField
          titleText="Last Name"
          setField={setLastName}
          secureText={true}
          required={true}
        />
        {/* New Password Confirmation Input Field */}
        <CustomTextField
          titleText="Username"
          setField={setUsername}
          secureText={true}
          required={true}
        />
        {/* Error Messages */}
        <View style={{ marginLeft: 20 }}>
          {
            firstNameEmpty() && 
            <Text style={styles.warning}>
              First name must not be empty.
            </Text>
          }
          {
            lastNameEmpty() && 
            <Text style={styles.warning}>
              Last name must not be empty.
            </Text>
          }
          {
            usernameEmpty() && 
            <Text style={styles.warning}>
              Username must not be empty.
            </Text>
          }
        </View>
        </ScrollView>
      </View>
      

      {/* Confirmation/Reset Button */}
      <TouchableOpacity
        style={styles.button}
        disabled={!fieldsValid()}
        onPress={() => reset()}
      >
        <Text style={styles.buttonText}>
          RESET
        </Text>
      </TouchableOpacity>
    </View>
  );
}
