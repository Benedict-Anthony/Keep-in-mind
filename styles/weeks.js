import { StyleSheet } from "react-native";
import { fonts } from "../constants/fonts";
import { color } from "../constants/color";

export const weeks = StyleSheet.create({
  week: {
    padding: 10,
    marginBottom: 30,
  },
  weekDay: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#cfcbca",
    shadowColor: "dark",
    shadowOffset: "10",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 15,
    flexDirection: "row",
    borderRadius: 10,
  },

  weekIcon: {
    fontSize: 30,
  },

  weekTitle: {
    fontSize: 25,
    fontFamily: fonts.medium,
    paddingVertical: 5,
    color: color.secondary,
  },

  weekDescription: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: color.dark,
  },
});
