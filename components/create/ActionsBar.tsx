import { View, StyleSheet } from "react-native";

import ResetImageButton from "@/components/create/imageResetButton";
import AspectRatioButton from "./aspectRatioButton";
import GridLayoutButton from "./gridLayoutButton";
import QualityButton from "./qualityButton";
import RunCropperButton from "./runCropperButton";

const ActionsBar = () => {
  return (
    <View style={styles.actionsBar}>
      <ResetImageButton />
      <AspectRatioButton />
      <GridLayoutButton />
      <QualityButton />
      <RunCropperButton />
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 12,
    width: "100%",
  },
});

export default ActionsBar;
