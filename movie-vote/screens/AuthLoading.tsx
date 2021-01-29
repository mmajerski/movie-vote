import React, { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const AuthLoading = (props: any) => {
  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        console.log(userToken);
        props.navigation.navigate("Profile");
      }
    };

    bootstrapAsync();
  });

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoading;
