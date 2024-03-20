import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { form } from "../styles/profileForm";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import { color } from "../constants/color";
const clockImage = require("../assets/images/clock.jpg");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SimpleLineIcons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import { level, department, courseCodes } from "../constants/selections";
import { database } from "../firebase/config";
import { getStoreData, storeData } from "../lib/storage";
import { addDoc, collection } from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import CustomSpinner from "../components/CustomSpinner";
import { Entypo } from "@expo/vector-icons";
import { fonts } from "../constants/fonts";

export default function ProfileForm({ navigation }) {
  const [image, setImage] = useState(null);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [profileType, setProfileType] = useState({
    student: true,
    lecturer: false,
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    currentLevel: "",
    department: "",
    courseCode: "",
    photo: "",
  });

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      const imageURL = result.assets[0].uri;
      console.log(result);
      setProfile({ ...profile, photo: imageURL });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profile.photo);
  const handleLectureChanage = () => {
    setProfileType({
      lecturer: true,
      student: false,
    });
  };
  const handleStudentChanage = () => {
    setProfileType({
      lecturer: false,
      student: true,
    });
  };

  // submit form data
  const submitData = async () => {
    if (profileType.student) {
      let value = Object.values(profile).every((value) => value);
      if (!value) {
        Alert.alert("Form Erorr", "Please enter all fields");
        return;
      }
      setIsSubmitting(true);

      try {
        const user = await getStoreData("user");
        value = {
          ...profile,
          ...user,
          courses: [],
          type: "student",
        };

        const profileRef = collection(database, "profile");
        await addDoc(profileRef, value);
        await storeData("profile", { profile: true });

        setIsSubmitting(false);
        navigation.replace("main");
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a Profile",
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const [user, profile] = await new Promise.all([
        getStoreData("user"),
        getStoreData("profile"),
      ]);
      if (!user) {
        return navigation.replace("login");
      }
      // if (profile) return navigation.replace("main");
    };
    checkUser();
  }, []);
  return (
    <ImageBackground source={clockImage} resizeMode="cover" style={{ flex: 1 }}>
      <ScrollView style={form.base}>
        <Spinner visible={isSubmiting} customIndicator={<CustomSpinner />} />
        <Text style={form.title}>Create your profile</Text>
        <View style={form.form}>
          <View style={form.formControl}>
            <Text style={form.label}>First name</Text>
            <TextInput
              style={form.input}
              value={profile.firstName}
              onChangeText={(e) => setProfile({ ...profile, firstName: e })}
            />
          </View>
          <View style={form.formControl}>
            <Text style={form.label}>Last name</Text>
            <TextInput
              style={form.input}
              value={profile.lastName}
              onChangeText={(e) => setProfile({ ...profile, lastName: e })}
            />
          </View>

          <View
            style={[
              form.flex,
              { justifyContent: "space-around", marginVertical: 10 },
            ]}
          >
            {/* <View style={form.flex}>
              <Text style={form.label}>Lecture</Text>
              <Checkbox
                style={form.checkbox}
                value={profileType.lecturer}
                color={color.primary}
                onValueChange={handleLectureChanage}
              />
            </View> */}
            <View style={form.flex}>
              <Text style={form.label}>Student</Text>
              <Checkbox
                style={form.checkbox}
                value={profileType.student}
                color={color.primary}
                onValueChange={handleStudentChanage}
              />
            </View>
          </View>

          {profileType.lecturer && (
            <Fragment>
              <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={level}
                save="value"
                onSelect={() => alert(selected)}
                label="Categories"
                placeholder="Select the level you take"
                inputStyles={form.selectInput}
                dropdownTextStyles={form.dropDownStyles}
                boxStyles={form.select}
                arrowicon={
                  <FontAwesome
                    name="chevron-circle-down"
                    size={24}
                    color={color.light}
                  />
                }
                closeicon={
                  <MaterialCommunityIcons
                    name="close-box"
                    size={24}
                    color={color.light}
                  />
                }
              />
            </Fragment>
          )}

          {profileType.student && (
            <Fragment>
              <View style={form.formControl}>
                <Text style={form.label}>Current level</Text>
                <SelectList
                  placeholder="Select Level"
                  inputStyles={form.selectInput}
                  dropdownTextStyles={form.dropDownStyles}
                  boxStyles={form.select}
                  setSelected={(e) =>
                    setProfile({ ...profile, currentLevel: e })
                  }
                  data={level}
                  save="level"
                  arrowicon={
                    <FontAwesome
                      name="chevron-circle-down"
                      size={24}
                      color={color.light}
                    />
                  }
                  closeicon={
                    <MaterialCommunityIcons
                      name="close-box"
                      size={24}
                      color={color.light}
                    />
                  }
                  search={true}
                />
              </View>

              <View style={form.formControl}>
                <Text style={form.label}>Department</Text>
                <SelectList
                  placeholder="Select Department"
                  inputStyles={form.selectInput}
                  dropdownTextStyles={form.dropDownStyles}
                  boxStyles={form.select}
                  setSelected={(e) => setProfile({ ...profile, department: e })}
                  data={department}
                  save="department"
                  arrowicon={
                    <FontAwesome
                      name="chevron-circle-down"
                      size={24}
                      color={color.light}
                    />
                  }
                  closeicon={
                    <MaterialCommunityIcons
                      name="close-box"
                      size={24}
                      color={color.light}
                    />
                  }
                  search={true}
                />
              </View>

              <View style={form.formControl}>
                <Text style={form.label}>Course Code</Text>
                <SelectList
                  placeholder="Select Couse code"
                  inputStyles={form.selectInput}
                  dropdownTextStyles={form.dropDownStyles}
                  boxStyles={form.select}
                  setSelected={(e) => setProfile({ ...profile, courseCode: e })}
                  data={courseCodes}
                  save="department"
                  arrowicon={
                    <FontAwesome
                      name="chevron-circle-down"
                      size={24}
                      color={color.light}
                    />
                  }
                  closeicon={
                    <MaterialCommunityIcons
                      name="close-box"
                      size={24}
                      color={color.light}
                    />
                  }
                  search={true}
                />
              </View>
            </Fragment>
          )}

          <TouchableOpacity style={form.formControl} onPress={pickImage}>
            <Text style={form.label}>Photo</Text>
            <View style={form.photoStyles}>
              {profile.photo ? (
                <Fragment>
                  <Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 23,
                      fontFamily: fonts.medium,
                    }}
                  >
                    <Entypo
                      name="image"
                      size={25}
                      color="white"
                      style={{ textAlign: "center" }}
                    />
                    Photo set
                  </Text>
                </Fragment>
              ) : (
                <Fragment>
                  <Text style={form.photoTextStyles}>select an Image</Text>
                  <SimpleLineIcons
                    name="picture"
                    size={24}
                    color={color.light}
                  />
                </Fragment>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <PrimaryButton disabled={false} onPress={submitData}>
          <Text style={form.submittext}>Submit</Text>
        </PrimaryButton>
      </ScrollView>
    </ImageBackground>
  );
}
