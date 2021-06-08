import React from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../lib/constants/colors";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CloseSlideButton = ({ isVisible, onPress }) => {
  return (
    isVisible && (
      <View style={styles.button}>
        <Button title="J'ai compris" raised onPress={onPress} />
      </View>
    )
  );
};

const SlideIndex = ({ data, page }) => {
  return (
    <View style={styles.cubeContainer}>
      {data.map((i, index) => (
        <View
          key={index}
          style={[
            styles.cube,
            { backgroundColor: page === index && Colors.WHITE },
          ]}
        />
      ))}
    </View>
  );
};

const Slides = ({ data, onComplete }) => {
  const renderSlides = () => {
    return data.map((slide, index) => (
      <View
        key={index}
        style={[styles.slide, { backgroundColor: slide.color }]}
      >
        <Text style={styles.text}>{slide.text}</Text>
        <CloseSlideButton
          isVisible={index === data.length - 1}
          onPress={onComplete}
        />
        <SlideIndex data={data} page={index} />
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} horizontal pagingEnabled>
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    width: SCREEN_WIDTH,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: Colors.WHITE,
  },
  button: {
    margin: 25,
  },
  cubeContainer: {
    width: 200,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cube: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
});

export default Slides;
