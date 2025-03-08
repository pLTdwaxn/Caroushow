import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { RootState } from "@/types";
import { useCropOverlayGestures } from "@/hooks/useCropOverlayGestures";
import DragHandle from "./DragHandle";

type CropOverlayProps = {
  deviceWidth: number;
  ratio: number;
};

const CropOverlay = ({ deviceWidth, ratio }: CropOverlayProps) => {
  const { composedGesture, updatedHeight } = useCropOverlayGestures(
    deviceWidth,
    ratio
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: updatedHeight.value,
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[styles.cropArea, animatedStyle]}
        pointerEvents="none"
      />

      <GestureDetector gesture={composedGesture}>
        <DragHandle />
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
    width: "100%",
  },
  bottomOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

const mapStateToProps = (state: RootState) => ({
  deviceWidth: state.device.width,
  ratio: state.slice.ratio,
});

export default connect(mapStateToProps)(CropOverlay);
