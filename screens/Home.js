import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { home } from "../styles/home";
import PrimaryButton from "../components/PrimaryButton";

export default function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={home.body}>
      <View>
        <Image
          source={require("../assets/images/bell.png")}
          style={home.homeImage}
        />
      </View>
      <View style={home.info}>
        <Text style={home.text}>
          Welcome to our innovative Lecture Reminder System! Designed to enhance
          your academic experience.{"  "}
          <Text
            style={home.textLinK}
            onPress={() => navigation.navigate("about")}
          >
            Read more
          </Text>
        </Text>
        <PrimaryButton onPress={() => navigation.navigate("main")}>
          <Text style={home.homebuttonText}>Make your schedule</Text>
        </PrimaryButton>
      </View>
    </View>
  );
}
