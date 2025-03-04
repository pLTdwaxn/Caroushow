import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import store from "@/store";
import { Ratio, RootState } from "@/types";
import { connect } from "react-redux";

const screenWidth = Dimensions.get("window").width;

type CropOverlayProps = {
  ratio: Ratio;
};

const CropOverlay = ({ ratio }: CropOverlayProps) => {
  const cropAreaHeight = (screenWidth / ratio.w) * ratio.h;

  return (
    <View style={styles.overlayContainer}>
      <View style={[styles.cropArea, { height: cropAreaHeight }]} />
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
        style={styles.dragHandle}
      />
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
