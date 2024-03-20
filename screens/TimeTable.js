import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import PrimaryButton from "../components/PrimaryButton";
import { timetableStyles } from "../styles/timetable";
import CustomSpinner from "../components/CustomSpinner";
import { flex } from "../styles/flex";
import { sortByWeekday } from "../lib/sortSchedule";

export default function TimeTable({ navigation }) {
  const [timeTable, seTimeTable] = useState([]);
  const [isFecthing, setIsFecthing] = useState(false);

  useEffect(() => {
    const getUserCourses = async () => {
      setIsFecthing(true);
      const user = await getStoreData("user");
      const collectionRef = collection(database, "profile");
      const queryRef = query(collectionRef, where("email", "==", user.email));

      const unSubscribe = onSnapshot(queryRef, (snaphots) => {
        const data = snaphots.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));
        if (data[0]?.courses) {
          seTimeTable(data[0].courses);
        }
        setIsFecthing(false);
      });

      return unSubscribe;
    };

    getUserCourses();
  }, []);

  const sortedSchedule = sortByWeekday(timeTable);

  return (
    <View style={{ flex: 1 }}>
      {isFecthing && timeTable.length === 0 ? (
        <CustomSpinner />
      ) : timeTable.length === 0 ? (
        <View style={timetableStyles.base}>
          <PrimaryButton onPress={() => navigation.navigate("Courses")}>
            <Text style={timetableStyles.buttonText}>
              Register Your courses
            </Text>
          </PrimaryButton>
        </View>
      ) : (
        <View style={timetableStyles.timeTable}>
          {sortedSchedule.map((table) => (
            <View key={table.id} style={timetableStyles.courseCard}>
              <Text style={timetableStyles.day}>{table.day}</Text>
              <Text style={timetableStyles.course}>{table.courseCode}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
