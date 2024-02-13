import { StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";

export const oauth = StyleSheet.create({
  base: {
    backgroundColor: color.secondary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    marginTop: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  text: {
    color: color.light,
    fontFamily: fonts.regular,
    fontSize: 20,
    textAlign: "center",
  },
});
