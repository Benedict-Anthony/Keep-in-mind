import { StyleSheet } from "react-native";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";
export const login = StyleSheet.create({
  login: {
    flex: 1,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },

  loginText: {
    fontFamily: fonts.bold,
    fontSize: 30,
    paddingBottom: 15,
    color: color.primary,
  },

  inputWrapper: {
    width: "100%",
  },
  formcontrol: {
    width: "100%",
    position: "relative",
  },

  formLabel: {
    paddingVertical: 2,
    fontSize: 19,
    fontFamily: fonts.regular,
    paddingLeft: 5,
  },
  input: {
    borderColor: "#007db8",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },

  icon: {
    position: "absolute",
    right: 0,
    top: "30%",
    marginRight: 5,
  },
  logginButtonText: {
    color: color.light,
    fontFamily: fonts.medium,
    fontSize: 20,
  },

  errors: {
    color: color.secondary,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginLeft: 5,
  },
});
