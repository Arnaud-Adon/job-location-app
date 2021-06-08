import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";
import { Card, Button } from "react-native-elements";
import { Colors } from "../lib/constants/colors";
import { likeJob } from "../lib/state/actions";

const DeckScreen = ({ jobs, likeJob, navigation }) => {
  const renderCard = (job) => {
    const initialRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    };
    return (
      <Card containerStyle={{ borderColor: Colors.BLACK }}>
        <Card.Title>{job.jobtitle}</Card.Title>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            cacheEnabled={Platform.OS === "ios" ? false : true}
            initialRegion={initialRegion}
            style={{ flex: 1 }}
          ></MapView>
        </View>
        <Card.Divider />
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}</Text>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>No more jobs.</Card.Title>
        <Card.Divider />
        <Button
          title="Retour à la carte"
          icon={{ name: "my-location" }}
          onPress={() => navigation.navigate("Map")}
        />
      </Card>
    );
  };

  return (
    <View>
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={(job) => likeJob(job)}
        keyProp="jobkey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default connect(({ jobs }) => ({ jobs: jobs.results }), { likeJob })(
  DeckScreen
);
