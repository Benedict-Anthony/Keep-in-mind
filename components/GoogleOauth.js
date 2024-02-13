import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { oauth } from "../styles/googleauth";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../constants/color";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

export default function GoogleOauth() {
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity style={oauth.base} onPress={googleLogin}>
      <AntDesign name="google" size={30} color={color.light} />
      <Text style={oauth.text}>Continue with google</Text>
    </TouchableOpacity>
  );
}
