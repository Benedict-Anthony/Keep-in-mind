import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { daysOfWeek } from "../constants/weeks";
import { weeks } from "../styles/weeks";
import { flex } from "../styles/flex";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";
import { getStoreData } from "../lib/storage";
export default function Weeks({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Daily tasks",
      // headerTintColor: color.light,
      // headerTitleStyle: {
      //   fontFamily: fonts.medium,
      //   fontSize: 22,
      // },
      // headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={weeks.week}>
      {daysOfWeek.map((day) => (
        <TouchableOpacity
          key={day.id}
          style={weeks.weekDay}
          onPress={() => navigation.navigate("Day", { name: day.day })}
        >
          <View>
            <Text style={weeks.weekIcon}>{day.icon}</Text>
          </View>
          <View style={flex.flexOne}>
            <Text style={weeks.weekTitle}>{day.day}</Text>
            <Text style={weeks.weekDescription}>{day.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
