import { StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";

export const profile = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: color.lightGray,
    padding: 10,
  },

  user: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontFamily: fonts.bold,
    fontSize: 30,
  },

  userEmail: {
    fontSize: 15,
  },

  userType: {
    fontSize: 20,
    fontFamily: fonts.regular,
    marginTop: 3,
  },

  userInfo: {
    marginTop: 30,
  },

  userInfoText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    marginBottom: 3,
  },
});
