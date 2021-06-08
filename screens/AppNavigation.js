import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./WelcomeScreen";
import AuthScreen from "./AuthScreen";
import MapScreen from "./MapScreen";
import DeckScreen from "./DeckScreen";
import ReviewScreen from "./ReviewScreen";
import SettingsScreen from "./SettingsScreen";
import { Feather, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const GoSettings = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingRight: 15 }}>
      <Feather name="settings" size={24} color="black" />
    </TouchableOpacity>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "Map":
              return (
                <Feather
                  name="map-pin"
                  size={24}
                  color={focused ? "blue" : "black"}
                />
              );
            case "Deck":
              return (
                <Feather
                  name="map"
                  size={24}
                  color={focused ? "blue" : "black"}
                />
              );
            case "Review":
              return (
                <AntDesign
                  name="eyeo"
                  size={24}
                  color={focused ? "blue" : "black"}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Deck" component={DeckScreen} />
      <Tab.Screen name="Review" component={ReviewNavigator} />
    </Tab.Navigator>
  );
};

const ReviewNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () =>
          route.name === "JobReview" && (
            <GoSettings onPress={() => navigation.navigate("Settings")} />
          ),
      })}
    >
      <Stack.Screen
        name="JobReview"
        component={ReviewScreen}
        options={{ headerTitle: null, headerLeft: false }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerTitle: null, headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
