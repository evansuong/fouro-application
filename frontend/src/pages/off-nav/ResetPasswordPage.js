import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
// APIs

// Contexts
import { DimensionContext } from "../../contexts/DimensionContext";
// Custom Components
import CustomTextField from "components/CustomTextField";
import Header from "components/Header"


export default function ResetPasswordPage({ navigation, route }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { windowWidth, windowHeight } = useContext(DimensionContext);
  const buttonMargin = 10;
  const buttonHeight = 50;
  const topMarginSize = windowWidth * 0.1 + 5;
  const routeName = route.name

  function verifyNewPasswordsMatch() {
    return confirmNewPassword === newPassword;
  }

  function oldPasswordEmpty() {
    return oldPassword === "";
  }

  function newPasswordEmpty() {
    return newPassword === "";
  }

  function fieldsValid() {
    return verifyNewPasswordsMatch() && 
    !oldPasswordEmpty() && 
    !newPasswordEmpty();
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
    }
  });

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Header routeName={routeName} navigation={navigation} onMainNav={false} />

      <View style={{ width: '100%' }}>
        <Text style={styles.header}>
          Reset Password
        </Text>
        {/* Old Password Input Field */}
        <CustomTextField
          titleText="Old Password"
          setField={setOldPassword}
          secureText={true}
          required={true}
        />
        {/* New Password Input Field */}
        <CustomTextField
          titleText="New Password"
          setField={setNewPassword}
          secureText={true}
          required={true}
        />
        {/* New Password Confirmation Input Field */}
        <CustomTextField
          titleText="Confirm New Password"
          setField={setConfirmNewPassword}
          secureText={true}
          required={true}
        />
        {/* Error Messages */}
        <View style={{ marginLeft: 20 }}>
          {
            !verifyNewPasswordsMatch() &&
            <Text style={styles.warning}>
              New passwords do not match.
            </Text>
          }
          {
            oldPasswordEmpty() && 
            <Text style={styles.warning}>
              You must enter the old password.
            </Text>
          }
          {
            newPasswordEmpty() && 
            <Text style={styles.warning}>
              New password cannot be empty.
            </Text>
          }
        </View>
      </View>

      {/* Confirmation/Reset Button */}
      <TouchableOpacity
        style={styles.button}
        disabled={!fieldsValid()}
      >
        <Text style={styles.buttonText}>
          RESET
        </Text>
      </TouchableOpacity>
    </View>
  );
}
