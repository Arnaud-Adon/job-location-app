import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-community/async-storage";

export default async () => {
  if (!Constants.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  let previousToken = await AsyncStorage.getItem("pushToken");

  if (previousToken) return;
  else {
    let { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      const { status: finalStatus } =
        await Notifications.requestPermissionsAsync();

      if (finalStatus !== "granted") {
        alert("Failed to get pushToken for push notification");
        return;
      }
    }
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("pushToken", token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }
};
