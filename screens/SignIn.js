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
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { emailIsValid } from "../lib/validateEmail";
import { auth } from "../firebase/config";
import { getStoreData, storeData } from "../lib/storage";
import AuthNavigation from "../components/AuthNavigation";

export default function SignIn({ navigation }) {
  const [fieldError] = useState({
    email: "Email field is required",
    password: "password field is required",
    confirmPassword: "please confirm your pasword",
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, comfirm_password } = data;
    const isValid = emailIsValid(email);
    if (!isValid) {
      Alert.alert(
        "Invalid Email Adress",
        "Please ensure you enterd a valid email address",
        [
          {
            text: "",
            style: "cancel",
            onPress: () => setValue("email", ""),
          },
        ]
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password", "passowrd should be at least six charaters", [
        {
          style: "default",
        },
      ]);
      return;
    }

    if (password !== comfirm_password) {
      Alert.alert("Password", "password does not match", [
        {
          style: "default",
        },
      ]);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(auth, email, password);
      reset();
      const user = { email: response.user.email, id: response.user.uid };
      await storeData("user", user);
      navigation.replace("main");
    } catch (error) {
      Alert.alert("Something went wrong. Please try again");
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
        <Text style={login.loginText}>Sign up for a free account</Text>
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
                  <Text style={login.errors}>{fieldError.email}</Text>
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
            <Text style={login.errors}>{fieldError.password}</Text>
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
                  style={login.input}
                  placeholder="password"
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
        <View style={login.inputWrapper}>
          <Text style={login.formLabel}>Confirm Password</Text>
          {errors.password && (
            <Text style={login.errors}>{fieldError.confirmPassword}</Text>
          )}
          <Controller
            name="comfirm_password"
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
                  style={login.input}
                  placeholder="confirm password"
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
          textTitle={"Already have an account?"}
          link={"log in"}
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </Fragment>
  );
}
