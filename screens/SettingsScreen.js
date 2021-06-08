import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../lib/state/actions";
import { Button } from "react-native-elements";

const SettingsScreen = ({ clearLikedJobs, navigation }) => {
  const handleClearLikedJob = async () => {
    await clearLikedJobs();
    Alert.alert("Jobs en favoris", "suppression réussie", [
      {
        onPress: () => navigation.navigate("JobReview"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        accessibilityLabel="Supprimer les favoris"
        title="Supprimer la liste des jobs en favoris"
        onPress={handleClearLikedJob}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});

export default connect(null, { clearLikedJobs })(SettingsScreen);
