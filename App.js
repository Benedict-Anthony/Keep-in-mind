import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { flex } from "./styles/flex";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Weeks from "./screens/Weeks";
import Login from "./screens/Login";
import SignIn from "./screens/SignIn";
import About from "./screens/About";
import "react-native-gesture-handler";
import MainDrawer from "./screens/MainDrawer";
import ProfileForm from "./screens/ProfileForm";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    bold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
    italic: require("./assets/fonts/RobotoCondensed-Italic.ttf"),
    light: require("./assets/fonts/RobotoCondensed-Light.ttf"),
    regular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
    medium: require("./assets/fonts/RobotoCondensed-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <SafeAreaView style={flex.flexOne} onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName="main">
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen
            name="main"
            component={MainDrawer}
            options={{
              animation: "flip",
            }}
          />
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ animation: "ios" }}
          />

          <Stack.Screen name="about" component={About} />
          <Stack.Screen name="profile" component={ProfileForm} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
