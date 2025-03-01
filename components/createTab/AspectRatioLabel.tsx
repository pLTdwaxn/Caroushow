import { Ratio } from "@/types";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { cycleRatio } from "@/store/slices/sliceSlice";
import store from "@/store";

type AspectRatioLabelProps = {
  ratio: Ratio;
};

const AspectRatioLabel = ({ ratio }: AspectRatioLabelProps) => {
  const handlePress = () => {
    store.dispatch(cycleRatio());
  };

  return (
    <View style={styles.container}>
      <Button title={`${ratio.w} : ${ratio.h}`} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#cfc",
  },
});

const mapStateToProps = (state: any) => {
  return {
    ratio: state.slice.ratio,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cycleRatio: () => dispatch(cycleRatio()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AspectRatioLabel);
