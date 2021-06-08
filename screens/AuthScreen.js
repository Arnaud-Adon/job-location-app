import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { facebookLogin } from "../lib/state/actions";
const AuthScreen = ({ facebookLogin, token, navigation }) => {
  const currentToken = useRef(token).current;

  useEffect(() => {
    facebookLogin();
    onAuthComplete();
  }, []);

  useEffect(() => {
    currentToken !== token && onAuthComplete();
  });

  const onAuthComplete = () => {
    token && navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text>Authentification via votre compte Facebook</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(({ auth }) => ({ token: auth.token }), {
  facebookLogin,
})(AuthScreen);
