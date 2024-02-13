import { StyleSheet } from "react-native";
import { color } from "../constants/color";

export const button = StyleSheet.create({
  base: {
    backgroundColor: color.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 4,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
