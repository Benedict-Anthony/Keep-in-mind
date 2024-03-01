import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { login } from "../styles/login";
import PrimaryButton from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../constants/color";
import { Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../firebase/config";
import AuthNavigation from "../components/AuthNavigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { emailIsValid } from "../lib/validateEmail";
import { getStoreData, storeData } from "../lib/storage";
import GoogleOauth from "../components/GoogleOauth";

export default function Login({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const isValid = emailIsValid(email);
    if (!isValid) {
      Alert.alert("Invalid email", "Please enter a valid email address");
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      reset();
      const user = { email: response.user.email, id: response.user.uid };
      await storeData("user", user);
      navigation.replace("main");
    } catch (error) {
      Alert.alert(
        "Invalid email or password",
        "please provide valid credentials or sign up for an account"
      );
    }
  };
  useEffect(() => {
    const checkAuthSate = async () => {
      const user = await getStoreData("user");
      if (user) {
        navigation.replace("main");
      }
    };
    checkAuthSate();
  }, []);
  return (
    <Fragment>
      <View style={login.login}>
        <Text style={login.loginText}>Login to Continue</Text>
        <View style={login.inputWrapper}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Fragment>
                <Text style={login.formLabel}>Email</Text>
                {errors.email && (
                  <Text style={login.errors}>email field is required</Text>
                )}
                <View style={login.formcontrol}>
                  <TextInput
                    style={login.input}
                    placeholder="email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <MaterialIcons
                    name="email"
                    size={30}
                    color={color.primary}
                    style={login.icon}
                  />
                </View>
              </Fragment>
            )}
          />
        </View>
        <View style={login.inputWrapper}>
          <Text style={login.formLabel}>Password</Text>
          {errors.password && (
            <Text style={login.errors}>password field is required</Text>
          )}
          <Controller
            name="password"
            control={control}
            rules={{
              required: [true, "password is required"],
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Pressable
                style={login.formcontrol}
                onPress={() => setIsVisible(!isVisible)}
              >
                <TextInput
                  autoCapitalize={"none"}
                  style={login.input}
                  placeholder="email"
                  secureTextEntry={!isVisible}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {!isVisible ? (
                  <AntDesign
                    name="eye"
                    size={30}
                    color={color.primary}
                    style={login.icon}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={30}
                    color={color.primary}
                    style={login.icon}
                  />
                )}
              </Pressable>
            )}
          />
        </View>
        {isSubmitting ? (
          <ActivityIndicator size={45} color={color.primary} />
        ) : (
          <PrimaryButton onPress={handleSubmit(onSubmit)}>
            <Text style={login.logginButtonText}>Login</Text>
          </PrimaryButton>
        )}
        {/* <GoogleOauth /> */}
        <AuthNavigation
          textTitle={"Don't have a account?"}
          link={"Sign up"}
          onPress={() => navigation.navigate("sign-in")}
        />
      </View>
    </Fragment>
  );
}
