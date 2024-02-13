import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { color } from "../constants/color";

export default function AuthNavigation({ onPress, textTitle, link }) {
  return (
    <View onTouchStart={onPress} style={style.container}>
      <Text style={style.text}>
        {textTitle} <Text style={style.link}>{link}</Text>
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  link: {
    color: color.primary,
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
