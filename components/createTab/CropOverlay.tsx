import { View, StyleSheet, Dimensions, Text } from "react-native";
import { connect } from "react-redux";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { LinearGradient } from "expo-linear-gradient";

import { Ratio, RootState } from "@/types";
import { setRatio } from "@/store/slices/sliceSlice";
import store from "@/store";

const screenWidth = Dimensions.get("window").width;

type CropOverlayProps = {
  ratio: Ratio;
};

const CropOverlay = ({ ratio }: CropOverlayProps) => {
  const cropAreaHeight = screenWidth * ratio.decimal;
  const offsetY = useSharedValue(0);
  const realTimeRatio = useSharedValue(ratio.decimal.toString());

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetY.set(e.translationY);
      realTimeRatio.set(
        ((cropAreaHeight + offsetY.get()) / screenWidth).toFixed(4)
      );
    })
    .onEnd(() => {
      const newRatio = (cropAreaHeight + offsetY.value) / screenWidth;
      store.dispatch(setRatio({ decimal: newRatio }));
      offsetY.value = 0;
    })
    .runOnJS(true);

  const tap = Gesture.Tap()
    .onEnd(() => {
      console.log("Tapped");
    })
    .runOnJS(true);

  const composedGesture = Gesture.Race(pan, tap);

  const animatedStyle = useAnimatedStyle(() => ({
    height: cropAreaHeight + offsetY.value,
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[styles.cropArea, animatedStyle]}
        pointerEvents="none"
      />
      <GestureDetector gesture={composedGesture}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
          style={styles.dragHandle}
        >
          <ReText style={styles.ratioDecimalLabel} text={realTimeRatio} />
        </LinearGradient>
      </GestureDetector>

      <View style={styles.bottomOverlay} pointerEvents="none"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  cropArea: {
    width: screenWidth,
  },
  dragHandle: {
    width: screenWidth,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ratioDecimalLabel: {
    color: "white",
  },
  bottomOverlay: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

const mapStateToProps = (state: RootState) => ({
  ratio: state.slice.ratio,
});

export default connect(mapStateToProps)(CropOverlay);
