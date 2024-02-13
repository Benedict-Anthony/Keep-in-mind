import { StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";

export const dayStyles = StyleSheet.create({
  base: {
    padding: 10,
  },

  courses: {
    padding: 10,
    backgroundColor: color.lightGray,
    borderRadius: 10,
  },

  courseTitle: {
    fontFamily: fonts.medium,
    fontSize: 21,
    color: color.dark,
  },

  courseCode: {
    fontFamily: fonts.regular,
    fontSize: 19,
    color: color.dark,
  },

  duration: {
    fontFamily: fonts.regular,
    fontSize: 19,
    color: color.secondary,
  },
});
