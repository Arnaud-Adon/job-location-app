import React, { useEffect, useRef, useState } from "react";
import {
  View,
  PanResponder,
  Animated,
  UIManager,
  LayoutAnimation,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
};

const Swipe = ({
  data,
  renderCard,
  renderNoMoreCards,
  keyProp,
  onSwipeRight,
}) => {
  const { onSwipeLeft } = defaultProps;
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const currentData = useRef(data).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      transform: [...position.getTranslateTransform(), { rotate }],
    };
  };

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((prevState) => prevState + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const renderCards = () => {
    if (index >= data.length) return renderNoMoreCards();
    const deck = data.map((item, i) => {
      if (i < index) return null;
      return i === index ? (
        <Animated.View
          key={item[keyProp]}
          style={[styles.card, getCardStyle()]}
          {...panResponder.panHandlers}
        >
          {renderCard(item)}
        </Animated.View>
      ) : (
        <Animated.View
          key={item[keyProp]}
          style={[
            styles.card,
            { top: 10 * (i - index), left: 2 * (i - index), zIndex: -1 },
          ]}
        >
          {renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === "ios" ? deck.reverse() : deck;
  };

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  useEffect(() => {
    if (currentData !== data) {
      setIndex(0);
    }
  }, [data]);

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

export default Swipe;
