import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const RATIO = 4 / 5;

const screenWidth = Dimensions.get("window").width;

const CropOverlay = () => {
  return (
    <View style={styles.overlayContainer}>
      <View style={styles.cropArea} />
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.5)", "rgb(255, 255, 255)"]}
        style={styles.bottomOverlay}
      />
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
    aspectRatio: RATIO,
  },
  bottomOverlay: {
    width: screenWidth,
    flex: 1,
  },
});

export default CropOverlay;
