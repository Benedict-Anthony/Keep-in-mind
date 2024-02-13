import React from "react";
import { TouchableOpacity } from "react-native";
import { button } from "../styles/button";

const PrimaryButton = ({ children, onPress, disabled }) => {
  return (
    <TouchableOpacity disabled={disabled} style={button.base} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
