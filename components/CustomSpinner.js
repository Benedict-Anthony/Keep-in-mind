import { View, Text, Image } from "react-native";
import React from "react";
import { fonts } from "../constants/fonts";

export default function CustomSpinner({ text }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../assets/images/spinner.gif")} />
      <Text style={{ fontFamily: fonts.regular, marginTop: 5, fontSize: 20 }}>
        {text}{" "}
      </Text>
    </View>
  );
}
