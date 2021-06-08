import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DEVICE_PREFIX } from "../lib/constants/platform";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import { fetchJobs } from "../lib/state/actions";
import { Colors } from "../lib/constants/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = ({ fetchJobs, navigation }) => {
  const [region, setRegion] = useState(initialRegion);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  const onButtonPress = () => {
    region &&
      fetchJobs(region, "indeed", () => {
        navigation.navigate("Deck");
      });
  };
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }
  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        style={styles.map}
        region={region ?? null}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={onButtonPress}>
        <Text style={styles.buttonText}>
          <Ionicons name={`${DEVICE_PREFIX}-search`} size={20} /> Chercher dans
          ce périmètre
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    marginHorizontal: 50,
    padding: 25,
    bottom: 20,
    left: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: Colors.LIGHTER_GREEN,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
  },
});

export default connect(null, { fetchJobs })(MapScreen);
