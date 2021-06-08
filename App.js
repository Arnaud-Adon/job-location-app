import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AppNavigation from "./screens/AppNavigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistedStore } from "./lib/state/store";
import registerForPushNotificationsAsync from "./lib/services/push_notification";
import * as Notifications from "expo-notifications";

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync();
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     const {
    //       request: {
    //         trigger: { payload },
    //       },
    //     } = notification;
    //     const {
    //       aps: { alert },
    //     } = payload;
    //     if (payload && alert) {
    //       Alert.alert(alert.title, alert.body, [{ text: "Ok" }]);
    //     }
    //   });
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) =>
    //     console.log("response", response)
    //   );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistedStore}>
        <View style={styles.container}>
          <AppNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
