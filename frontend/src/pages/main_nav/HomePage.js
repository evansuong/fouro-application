import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import AppStyles from "../../AppStyles";
import Background from "components/Background";
import * as Users from "backend/routes/Users";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage({ navigation }) {
  return (
    <View style={AppStyles.navPageContainer}>
      <Text>home</Text>
      <Button
        title="hijack frontend"
        onPress={() => Users.addUser("evanjserrano", "evan", "serrano")}
      />
      <Button
        title="create hug"
        onPress={() => navigation.navigate("Create Hug")}
      />
      <Button
        title="add friend"
        onPress={() => navigation.navigate("Add Friend")}
      />
      <Button
        title="launch page"
        onPress={() => navigation.navigate("Launch Page")}
      />
    </View>
  );
}
