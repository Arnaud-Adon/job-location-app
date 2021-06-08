import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Card, Button } from "react-native-elements";
import { openURL } from "expo-linking";
import { Colors } from "../lib/constants/colors";
import MapView from "react-native-maps";

const EmptyJobReview = ({ isVisible }) => {
  return (
    isVisible && <Text style={styles.emptyJobs}>Aucun job en favoris</Text>
  );
};

const LikedJobs = ({ isVisible, jobs }) => {
  return (
    isVisible &&
    jobs.map((job) => {
      const {
        company,
        formattedRelativeTime,
        url,
        latitude,
        longitude,
        jobtitle,
        jobkey,
      } = job;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };
      return (
        <Card key={jobkey}>
          <Card.Title>{jobtitle}</Card.Title>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              cacheEnabled={Platform.OS !== "ios"}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Voir"
              buttonStyle={{ backgroundColor: Colors.LIGHTER_BLUE }}
              onPress={() => openURL(url)}
            />
          </View>
        </Card>
      );
    })
  );
};

const ReviewScreen = ({ jobs }) => {
  return (
    <ScrollView>
      <LikedJobs isVisible={jobs.length > 0} jobs={jobs} />
      <EmptyJobReview isVisible={!jobs.length} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  italics: {
    fontStyle: "italic",
  },
  emptyJobs: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default connect(
  ({ likedJobs }) => ({ jobs: likedJobs }),
  null
)(ReviewScreen);
