import { View, Text, ScrollView, Alert, Modal } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import CustomSpinner from "../components/CustomSpinner";
import { dayStyles } from "../styles/day";
import { flex } from "../styles/flex";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";

export default function Day({ navigation, route }) {
  const [weekDayCourses, setWeekDayCourses] = useState([]);
  const [isFecthing, setIsFecthing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.name} Timetable`,
    });
  }, [route.params.name]);

  useEffect(() => {
    async function getWeekDayCouses() {
      setIsFecthing(true);
      try {
        const user = await getStoreData("user");
        const collectionRef = collection(database, "profile");
        const queryRef = query(collectionRef, where("email", "==", user.email));
        const unSubscribe = onSnapshot(queryRef, (snapshots) => {
          const data = snapshots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          const courses = data[0].courses;
          setWeekDayCourses(
            courses.filter((doc) => doc.day === route.params.name)
          );

          setIsFecthing(false);
        });

        return unSubscribe;
      } catch (error) {
        Alert.alert("Internet Connection Error");
      }
    }

    getWeekDayCouses();
  }, [route.params.name]);

  return (
    <View style={flex.flexOne}>
      {isFecthing && weekDayCourses.length === 0 ? (
        <CustomSpinner text={"please wait..."} />
      ) : weekDayCourses.length === 0 ? (
        <View
          style={[
            flex.flexOne,
            {
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            },
          ]}
        >
          <Text style={{ fontSize: 25, marginBottom: 10, textAlign: "center" }}>
            Today seems to be a free day 🎉🎉
          </Text>
          <PrimaryButton onPress={() => navigation.navigate("Weeks")}>
            <Text style={{ color: "white", fontSize: 20 }}>Have fun </Text>
          </PrimaryButton>
        </View>
      ) : (
        <ScrollView style={dayStyles.base}>
          {weekDayCourses.map((item) => (
            <View key={item.id} style={dayStyles.courses}>
              <Text style={dayStyles.courseTitle}>{item.courseTitle}</Text>
              <Text style={dayStyles.courseCode}>{item.courseCode}</Text>
              <Text style={dayStyles.duration}>
                {item.timeStart} to {item.timeEnd}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
