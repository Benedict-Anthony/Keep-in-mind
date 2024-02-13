import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import { profile as base } from "../styles/profile";
import { color } from "../constants/color";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Profile");

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      title: headerTitle,
    });
  }, []);

  useEffect(() => {
    async function getUserProfile() {
      try {
        setIsSubmiting(true);
        const user = await getStoreData("user");

        const collectionRef = collection(database, "profile");
        const snapShot = query(collectionRef, where("email", "==", user.email));
        const unSubscribe = onSnapshot(snapShot, (shots) => {
          const data = shots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setProfile(data[0]);
          // setHeaderTitle(data[0].firstName);
        });
        setIsSubmiting(false);
        return unSubscribe;
      } catch (error) {}
    }

    getUserProfile();
  }, []);
  return (
    <Fragment>
      {!profile ? (
        <ActivityIndicator
          color={color.primary}
          size={40}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
          }}
        />
      ) : (
        <View style={base.base}>
          <View style={base.user}>
            <Image
              style={base.userImage}
              source={{
                uri: profile.photo,
              }}
            />
            <Text style={base.userName}>
              {profile.firstName} {profile.lastName}{" "}
            </Text>
            <Text style={base.userEmail}>{profile.email}</Text>
            <Text style={base.userType}>{profile.type}</Text>
          </View>

          <View style={base.userInfo}>
            <Text style={base.userInfoText}>
              Department: {profile.department}
            </Text>
            <Text style={base.userInfoText}>
              Current Level: {profile.currentLevel}
            </Text>
            <Text style={base.userInfoText}>
              Course Code: {profile.courseCode}
            </Text>
          </View>
        </View>
      )}
    </Fragment>
  );
}
