import { Dimensions, StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";
const width = Dimensions.get("screen").width;
export const about = StyleSheet.create({
  about: {
    padding: 10,
    marginBottom: 40,
    flex: 1,
  },
  heading: {
    fontSize: width > 320 ? 35 : 27,
    color: color.secondary,
    fontFamily: fonts.bold,
    textAlign: "center",
    paddingBottom: 10,
  },

  text: {
    marginBottom: 5,
    paddingVertical: 5,
    fontSize: width > 320 ? 18 : 15,
    fontFamily: fonts.regular,
    lineHeight: 25,
  },
  buttonText: {
    color: color.light,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
