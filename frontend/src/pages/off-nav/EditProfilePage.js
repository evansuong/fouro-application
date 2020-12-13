import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
// APIs
import { ReadAPI, UpdateAPI } from '../../API';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
import { UserContext } from 'contexts/UserContext';
// Custom Components
import CustomTextField from "components/CustomTextField";
import Header from "components/Header"


export default function EditProfilePage({ navigation, route }) {
  // States
  const [fetchedUser, setFetchedUser] = useState();
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

  // TODO: use useEffect to init the fields with current user info
  useEffect(() => {
    fetchUserData();
  }, [])

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

  const fetchUserData = async () => {
    const { status, data } = 
      await ReadAPI.getUserProfile(userData.uid);
    if (status) {
      setFetchedUser(data);
      const [ userFirstName, userLastName ] = data.name.split(" ");
      setFirstName(userFirstName)
      setLastName(userLastName)
      setUsername(data.username)
    } else {
      Alert.alert('Something went wrong when fetching user data');
    }
  }

  // function edit() {
  //   // if(verifyUserInputs()) {
  //       postUserProfile
  //   // }
  // }

  const edit = async () => {
    const request = {
      username: username,
      firstName: firstName,
      lastName: lastName
    }
    const { status, data } = 
      await UpdateAPI.updateUserProfile(userData.uid, request);
    if(status) {
      Alert.alert("Profile updated!")
      console.log(data)
    } else {
      Alert.alert("Something went wrong while updating profile.")
    }
  }

  function verifyUserInputs() {
    // TODO: verify alphanumeric chars for username
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
          defaultValue={firstName}
          required={true}
        />
        {/* New Password Input Field */}
        <CustomTextField
          titleText="Last Name"
          setField={setLastName}
          defaultValue={lastName}
          required={true}
        />
        {/* New Password Confirmation Input Field */}
        <CustomTextField
          titleText="Username"
          setField={setUsername}
          defaultValue={username}
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
      

      {/* Confirmation/Edit Button */}
      <TouchableOpacity
        style={styles.button}
        disabled={!fieldsValid()}
        onPress={() => edit()}
      >
        <Text style={styles.buttonText}>
          CHANGE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
