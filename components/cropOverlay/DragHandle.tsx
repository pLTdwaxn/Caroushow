import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ReText } from "react-native-redash";
import { DerivedValue } from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

type DragHandleProps = {
  realTimeRatio: DerivedValue<string>;
};

const DragHandle = ({ realTimeRatio }: DragHandleProps) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.5)"]}
      style={styles.dragHandle}
    >
      <ReText style={styles.ratioDecimalLabel} text={realTimeRatio} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dragHandle: {
    width: screenWidth,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ratioDecimalLabel: {
    color: "white",
  },
});

export default DragHandle;
