import { View, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Ratio, RootState } from "@/types";
import { useCropOverlayGestures } from "@/hooks/useCropOverlayGestures";
import DragHandle from "./DragHandle";

const screenWidth = Dimensions.get("window").width;

type CropOverlayProps = {
  ratio: Ratio;
};

const CropOverlay = ({ ratio }: CropOverlayProps) => {
  const { composedGesture, offsetY, realTimeRatio, cropAreaHeight } =
    useCropOverlayGestures(ratio.decimal);

  const animatedStyle = useAnimatedStyle(() => ({
    height: cropAreaHeight + offsetY.get(),
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[styles.cropArea, animatedStyle]}
        pointerEvents="none"
      />

      <GestureDetector gesture={composedGesture}>
        <DragHandle realTimeRatio={realTimeRatio} />
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
