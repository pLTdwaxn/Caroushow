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
  },
  bottomOverlay: {
    width: screenWidth,
    flex: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  ratio: state.slice.ratio,
});

export default connect(mapStateToProps)(CropOverlay);
