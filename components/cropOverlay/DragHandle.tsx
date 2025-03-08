import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RootState, socialMediaState } from "@/types";
import { connect } from "react-redux";

type DragHandleProps = {
  aspectRatio: number;
  socialMedia: socialMediaState;
};

const DragHandle = ({ aspectRatio, socialMedia }: DragHandleProps) => {
  const colors = () => {
    if (
      aspectRatio < socialMedia.minRatio ||
      aspectRatio > socialMedia.maxRatio
    ) {
      return ["rgba(255, 140, 140, 0.2)", "rgba(255, 140, 140, 0.5)"] as const;
    }
    return ["rgba(140, 255, 140, 0.2)", "rgba(140, 255, 140, 0.5)"] as const;
  };

  return (
    <LinearGradient colors={colors()} style={styles.dragHandle}>
      <Text style={styles.aspectRatioLabel}>{aspectRatio.toFixed(3)}</Text>
    </LinearGradient>
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
