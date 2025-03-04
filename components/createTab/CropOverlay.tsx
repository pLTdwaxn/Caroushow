import { View, StyleSheet, Dimensions, Text } from "react-native";
import { connect } from "react-redux";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";

import { Ratio, RootState } from "@/types";

const screenWidth = Dimensions.get("window").width;

type CropOverlayProps = {
  ratio: Ratio;
};

const CropOverlay = ({ ratio }: CropOverlayProps) => {
  const cropAreaHeight = screenWidth * ratio.decimal;
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetY.value = e.translationY;
    })
    .onEnd(() => {});

  const animatedStyle = useAnimatedStyle(() => ({
    height: cropAreaHeight + offsetY.value,
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View style={[styles.cropArea, animatedStyle]} />
      <GestureDetector gesture={pan}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
          style={styles.dragHandle}
        >
          <Text style={styles.ratioDecimalLabel}>
            {ratio.decimal.toFixed(2)}
          </Text>
        </LinearGradient>
      </GestureDetector>

      <View style={styles.bottomOverlay}></View>
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
