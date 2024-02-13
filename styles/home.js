import { Dimensions, StyleSheet } from "react-native";
import { fonts } from "../constants/fonts";
import { color } from "../constants/color";

export const home = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    height: Dimensions.get("window").height + 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 50,
    marginBottom: 20,
  },
  info: {
    paddingHorizontal: 1,
  },
  homeImageWrapper: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
  homeImage: {
    width: 150,
    height: 170,
    objectFit: "cover",
    shadowColor: "gray",
  },
  text: {
    fontSize: 25,
    lineHeight: 40,
    paddingVertical: 15,
    textAlign: "center",
    fontFamily: fonts.light,
  },
  homebuttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: fonts.bold,
  },

  textLinK: {
    fontSize: 18,
    color: color.primary,
    marginRight: 10,
    textDecorationLine: "underline",
  },
});
