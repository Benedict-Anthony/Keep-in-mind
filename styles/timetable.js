import { StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";

export const timetableStyles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  buttonText: {
    color: color.light,
    fontSize: 20,
    fontFamily: fonts.medium,
  },

  timeTable: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  day: {
    fontFamily: fonts.regular,
    fontSize: 18,
  },

  course: {
    fontFamily: fonts.medium,
    fontSize: 22,
  },

  courseCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: color.lightGray,
    borderRadius: 3,
  },
});
