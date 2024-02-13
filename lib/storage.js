import AsyncStorage from "@react-native-async-storage/async-storage";
export const getStoreData = async (user) => {
  const value = await AsyncStorage.getItem(user);
  if (!value) return null;
  return JSON.parse(value);
};

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeData = async (key, value) => {
  await AsyncStorage.removeItem(key);
};
