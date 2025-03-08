import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "@/types";
import { connect } from "react-redux";

type DragHandleProps = {
  ratio: number;
};

const DragHandle = ({ ratio }: DragHandleProps) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
      style={styles.dragHandle}
    >
      <Text style={styles.ratioDecimalLabel}>{ratio}</Text>
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
  ratioDecimalLabel: {
    color: "white",
  },
});

const mapStateToProps = (state: RootState) => ({
  ratio: state.slice.ratio,
});

export default connect(mapStateToProps)(DragHandle);
