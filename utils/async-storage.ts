import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (userId: string) => {
  try {
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    console.error(error);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    console.error(error);
  }
};

export const getValueFromStorage = async () => {
  try {
    return await AsyncStorage.getItem("userId");
  } catch (error) {
    console.error(error);
  }
};
