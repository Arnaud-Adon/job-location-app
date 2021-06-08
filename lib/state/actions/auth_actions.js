import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAILURE } from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import { initializeAsync, logInWithReadPermissionsAsync } from "expo-facebook";

export const facebookLogin = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("fb_token");
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  await initializeAsync();
  const { type, token } = await logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"],
  });

  if (type === "cancel") {
    return dispatch({ type: FACEBOOK_LOGIN_FAILURE });
  }

  await AsyncStorage.setItem("fb_token", token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
