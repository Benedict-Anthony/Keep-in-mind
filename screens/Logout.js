import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { removeData } from "../lib/storage";

export default function Logout({ navigation }) {
  useEffect(() => {
    async function logOut() {
      await removeData("user");
      navigation.replace("home");
    }

    logOut();
  }, []);
  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
}
