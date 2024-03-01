import { createDrawerNavigator } from "@react-navigation/drawer";
import Weeks from "./Weeks";
import Profile from "./Profile";
import { color } from "../constants/color";
import { useEffect, useLayoutEffect } from "react";
import { fonts } from "../constants/fonts";
import ProfileForm from "./ProfileForm";
import { getStoreData } from "../lib/storage";
import Courses from "./Courses";
import TimeTable from "./TimeTable";
import Day from "./Day";
import Logout from "./Logout";
import Notification from "../components/Notification";

const Drawer = createDrawerNavigator();

function MainDrawer({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Discover Your Week 📆",
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

  useEffect(() => {
    const checkUser = async () => {
      const [user, profile] = await new Promise.all([
        getStoreData("user"),
        getStoreData("profile"),
      ]);
      if (!user) {
        return navigation.replace("login");
      }
      if (!profile) return navigation.replace("profile");
    };
    checkUser();
  }, []);
  return (
    <Notification>
      <Drawer.Navigator>
        <Drawer.Screen name="weeks" component={Weeks} />
        <Drawer.Screen name="profile" component={Profile} />
        <Drawer.Screen name="courses" component={Courses} />
        <Drawer.Screen name="timetable" component={TimeTable} />
        <Drawer.Screen name="day" component={Day} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </Notification>
  );
}
export default MainDrawer;
