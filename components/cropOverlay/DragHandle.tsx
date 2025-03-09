import React from "react";
import { Text, StyleSheet } from "react-native";

import { BlurView } from "expo-blur";

import { RootState, socialMediaState } from "@/types";
import { connect } from "react-redux";

type DragHandleProps = {
  aspectRatio: number;
  socialMedia: socialMediaState;
};

const DragHandle = ({ aspectRatio, socialMedia }: DragHandleProps) => {
  const colors = () =>
    aspectRatio < socialMedia.minRatio || aspectRatio > socialMedia.maxRatio
      ? { backgroundColor: "rgba(255, 140, 140, 0.25)" }
      : { backgroundColor: "rgba(140, 255, 140, 0.25)" };

  return (
    <BlurView style={[styles.dragHandle, colors()]} collapsable={false}>
      <Text style={styles.aspectRatioLabel}>{aspectRatio.toFixed(3)}</Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  dragHandle: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  aspectRatioLabel: {
    color: "white",
  },
});

const mapStateToProps = (state: RootState) => ({
  aspectRatio: state.param.aspectRatio,
  socialMedia: state.socialMedia,
});

export default connect(mapStateToProps)(DragHandle);
