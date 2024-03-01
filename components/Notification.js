import { useState, useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

const BACKGROUND_FETCH_TASK = "background-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );
  try {
    const user = await getStoreData("user");
    if (!user) return;
    const collectionRef = collection(database, "profile");
    const queryRef = query(collectionRef, where("email", "==", user.email));
    const snaphots = await getDocs(queryRef);
    const data = snaphots.docs.map((item) => item.data());

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/alarm.mp3")
    );
    const courses = data[0].courses;
    for (let i = 0; i < courses.length; i++) {
      const now = new Date().toLocaleTimeString().split(":");
      const hour = now[0];
      const minutes = now[1];
      const seconds = now[2];

      const midday = seconds.split(" ")[1].toLowerCase();
      const currentTime = `${hour}:${midday}`;

      if (courses[i].timeStart === currentTime) {
        const title = courses[i].courseTitle;
        const body = `${courses[i].courseCode}: ${courses[i].courseTitle} class is ready to take off 🎉🎉`;
        await sound.playAsync();
        await schedulePushNotification(title, body);
        // await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }
  } catch (error) {
    console.log(error);
  }

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Notification({ children }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [sound, setSound] = useState();

  //   async function playSound() {
  //     console.log("Loading Sound");
  //     const { sound } = await Audio.Sound.createAsync(
  //       require("./assets/Hello.mp3")
  //     );
  //     setSound(sound);

  //     console.log("Playing Sound");
  //   }

  // register task manager
  useEffect(() => {
    const checkStatusAsync = async () => {
      await registerBackgroundFetchAsync();
    };
    checkStatusAsync();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}

async function schedulePushNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${title} 📬`,
      body: body,
      data: { data: "goes here" },
    },
    trigger: { seconds: 5 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "reminder-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
