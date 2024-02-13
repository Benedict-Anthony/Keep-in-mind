import { StyleSheet } from "react-native";
import { fonts } from "../constants/fonts";
import { color } from "../constants/color";
export const form = StyleSheet.create({
  base: {
    padding: 10,
    paddingTop: 20,
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(3, 15, 33,.89)",
    paddingBottom: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },

  form: {
    flex: 1,
    padding: 3,
  },

  title: {
    textAlign: "left",
    fontSize: 25,
    fontFamily: fonts.regular,
    color: color.light,
    marginBottom: 8,
  },
  formControl: {
    padding: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: color.light,
    marginBottom: 3,
  },

  input: {
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: color.light,
    color: color.light,
    fontSize: 20,
  },

  select: {
    width: "100%",
    marginTop: 2,
    borderColor: color.light,
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 5,
  },
  dropDownStyles: {
    color: "white",
    fontSize: 17,
  },

  selectInput: {
    color: "white",
    fontSize: 16,
  },
  photoStyles: {
    // backgroundColor: color.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    borderRadius: 10,
  },

  photoTextStyles: {
    color: color.light,
    fontSize: 20,
  },

  submittext: {
    color: color.light,
    textTransform: "uppercase",
    fontSize: 17,
  },
});
