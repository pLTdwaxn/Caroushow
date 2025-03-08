import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "@/types";
import { connect } from "react-redux";

type DragHandleProps = {
  aspectRatio: number;
};

const DragHandle = ({ aspectRatio }: DragHandleProps) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
      style={styles.dragHandle}
    >
      <Text style={styles.aspectRatioLabel}>{aspectRatio}</Text>
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
});

export default connect(mapStateToProps)(DragHandle);
