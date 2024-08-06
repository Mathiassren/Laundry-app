// pages/Profile.js
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider"; // Update the import path as necessary
import { useNavigation } from "expo-router"; // Use expo-router navigation

const Profile = () => {
  const { handleLogout } = useGlobalContext();
  const navigation = useNavigation();

  const logoutUser = async () => {
    await handleLogout();
    alert("Logged out successfully");
    navigation.navigate("index"); // Navigate to Home or login screen after logout
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
