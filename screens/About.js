import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { about } from "../styles/about";
import PrimaryButton from "../components/PrimaryButton";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";

export default function About({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About Reminder 🚀",
      headerTintColor: color.light,
      headerTitleStyle: {
        fontFamily: fonts.medium,
        fontSize: 22,
      },
      headerStyle: {
        backgroundColor: color.primary,
        color: "white",
      },
    });
  }, []);
  return (
    <ScrollView style={about.about}>
      <Text style={about.heading}>About Reminder</Text>
      <View>
        <Text style={about.text}>
          Welcome to our Lecture Reminder System, your personal guide to a more
          organized and productive academic journey. Designed with you in mind,
          this system ensures that important lectures and deadlines are never
          overlooked.
        </Text>

        <Text style={about.text}>
          Seamlessly integrating into your routine, it provides timely reminders
          tailored to your class schedule. Say goodbye to missed lectures and
          hello to enhanced learning experiences. Our mission is to empower you
          with the tools to stay on top of your academic commitments
          effortlessly.
        </Text>
        <Text style={about.text}>
          Whether you're a student navigating a complex curriculum or an
          educator managing diverse classes, our Lecture Reminder System is here
          to simplify your life. Explore the convenience of automated reminders,
          personalized for each day of the week. Embrace a more organized
          approach to learning, allowing you to focus on what truly matters –
          gaining knowledge and excelling in your academic pursuits.{" "}
        </Text>
        <Text style={about.text}>
          Join us on this journey towards a more efficient and stress-free
          educational experience. Let our Lecture Reminder System be the compass
          that guides you through your academic adventures. Your success starts
          with timely reminders and ends with a brighter, more accomplished
          future.
        </Text>
      </View>
      <PrimaryButton onPress={() => navigation.navigate("login")}>
        <Text style={about.buttonText}>Get Started</Text>
      </PrimaryButton>
    </ScrollView>
  );
}
