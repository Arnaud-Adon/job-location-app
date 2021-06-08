import React, { useEffect, useState } from "react";
import Slides from "../components/Slides";
import { Colors } from "../lib/constants/colors";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";

const SLIDE_DATA = [
  { text: "Bienvenue sur Map Job Application", color: Colors.LIGHTER_BLUE },
  {
    text: "Utiliser l'application pour trouver un traivail",
    color: Colors.LIGHTER_GREEN,
  },
  {
    text: "Indiquer votre position, puis faites glissez",
    color: Colors.LIGHTER_BLUE,
  },
];

const WelcomeScreen = ({ navigation }) => {
  const [tokenExist, setTokenExist] = useState(false);
  const onSlideComplete = () => {
    navigation.navigate("Auth");
  };

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("fb_token");
      if (token) {
        setTokenExist(true);
        navigation.navigate("Main");
      } else setTokenExist(true);
    }
    getToken();
  }, []);

  if (!tokenExist) {
    return <AppLoading />;
  }
  return <Slides data={SLIDE_DATA} onComplete={onSlideComplete} />;
};

export default WelcomeScreen;
