import { Ratio } from "@/types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

type AspectRatioLabelProps = {
  ratio: Ratio;
};

const AspectRatioLabel = ({ ratio }: AspectRatioLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {ratio.h} : {ratio.w}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = (state: any) => {
  return {
    ratio: state.slice.ratio,
  };
};

export default connect(mapStateToProps)(AspectRatioLabel);
