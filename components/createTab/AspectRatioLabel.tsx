import { Ratio } from "@/types";
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
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
      <Button
        title={
          ratio.fraction ? ratio.fraction.toString() : ratio.decimal.toString()
        }
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderRadius: 2,
    backgroundColor: "rgba(204, 255, 204, 0.5)",
  },
});

const mapStateToProps = (state: any) => {
  return {
    ratio: state.slice.ratio,
  };
};

export default connect(mapStateToProps)(AspectRatioLabel);
