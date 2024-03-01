import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../firebase/config";
import Course from "../components/Course";
import { color } from "../constants/color";
import { fonts } from "../constants/fonts";
import { getStoreData } from "../lib/storage";
import CustomSpinner from "../components/CustomSpinner";

export default function Courses({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [seletedCourses, setSelectedCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState();
  const [isRegsistratring, setIsRegsistratring] = useState(false);

  const addCourseToList = (
    code,
    id,
    courseCode,
    timeStart,
    timeEnd,
    day,
    courseTitle
  ) => {
    // get selected course and toggle the boolean state
    const selectedCourse = courses.find((item) => item.id === id);
    selectedCourse.selected = !selectedCourse.selected;

    // add or remove a course from the list
    setSelectedCourses((prev) => {
      const isAlreadySelected = prev.find((data) => data.id === id) || null;
      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== id);
      }
      return [
        ...prev,
        { code, id, courseCode, timeStart, timeEnd, day, courseTitle },
      ];
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Register Your Courses",
    });
  }, []);

  // GET PROFILE ID
  async function getProfileID() {
    const user = await getStoreData("user");
    const profileRef = collection(database, "profile");
    const queryRef = query(profileRef, where("email", "==", user.email));

    const unSubscribe = onSnapshot(queryRef, (snapshots) => {
      const data = snapshots.docs.map((docs) => ({
        id: docs.id,
      }));

      setProfile(data[0]);
    });

    return unSubscribe;
  }

  console.log(seletedCourses);

  // GET ALL COURSES FOR REGISTRATION
  async function getAllCourse() {
    const collectionRef = collection(database, "courses");
    const queryRef = query(collectionRef, where("code", "==", "CSC"));
    const unSubscribe = onSnapshot(queryRef, (shots) => {
      const data = shots.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
        selected: false,
      }));
      setCourses(data);
    });

    return unSubscribe;
  }

  // REGISTER USER TO COURSES SELECTED
  const handleRegister = async () => {
    if (seletedCourses.length === 0) {
      return Alert.alert(
        "No course selected",
        "Please select at least one course"
      );
    }
    setIsRegsistratring(true);
    try {
      const docRef = doc(database, "profile", profile.id);
      await updateDoc(docRef, {
        courses: seletedCourses,
      });
      setSelectedCourses([]);
      setIsRegsistratring(false);
      navigation.navigate("timetable");
    } catch (error) {}
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  useEffect(() => {
    getProfileID();
  }, []);

  return (
    <Fragment>
      {isRegsistratring || (courses.length === 0 && !profile) ? (
        <CustomSpinner text={"Please wait"} />
      ) : (
        <RefreshControl
          style={{ flex: 1 }}
          refreshing={refreshing}
          onRefresh={getAllCourse}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            {seletedCourses.length > 0 && profile && (
              <Button title="Register" onPress={handleRegister} />
            )}
          </View>

          <View>
            <FlatList
              data={courses}
              keyExtractor={(item) => item.id}
              renderItem={(item) => (
                <Pressable
                  style={{ marginBottom: 10 }}
                  onPress={() =>
                    addCourseToList(
                      item.item.code,
                      item.item.id,
                      item.item.courseCode,
                      item.item.timeStart,
                      item.item.timeEnd,
                      item.item.day,
                      item.item.courseTitle
                    )
                  }
                >
                  <Course item={item.item} isSelected={item.item.selected} />
                </Pressable>
              )}
            />
          </View>
        </RefreshControl>
      )}
    </Fragment>
  );
}
