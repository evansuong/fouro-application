import { Button, Text, View } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

// Backend TEST
import Users from "../../backend/users/Users";

export default function HomePage({ navigation }) {
  return (
    <View style={AppStyles.container}>
      <Text>home</Text>
      <Button
        //title="create hug"
        title="BACKEND TEST"
        //onPress={() => navigation.navigate("Create Hug")}
        onPress={() => Users.addUser("John")} // Backend TEST
      />
      <Button
        title="add friend"
        onPress={() => navigation.navigate("Add Friend")}
      />
      <Button
        title="friend history"
        onPress={() => navigation.navigate("Friend History")}
      />
      <Button
        title="friend profile"
        onPress={() => navigation.navigate("Friend Profile")}
      />
    </View>
  );
}
