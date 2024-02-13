import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { color } from "../constants/color";
import CheckBox from "expo-checkbox";
import { fonts } from "../constants/fonts";

export default function Course({ item, isSelected }) {
  return (
    <View style={styles.base}>
      <View>
        <CheckBox
          style={{ borderRadius: 50, width: 40, height: 40 }}
          value={isSelected}
          color={color.primary}
        />
      </View>
      <View style={styles.course}>
        <Text style={styles.courseText}>
          {item.courseTitle}{" "}
          <Text style={styles.courseCode}>({item.courseCode})</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 10,
    backgroundColor: color.lightGray,
    marginHorizontal: 5,
    flex: 1,
  },

  courseCode: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },

  courseText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
