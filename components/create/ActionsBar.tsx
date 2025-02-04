import { View, StyleSheet } from "react-native";

import ResetButton from "./ResetButton";
import AspectRatioButton from "./AspectRatioButton";
import GridLayoutButton from "./GridLayoutButton";
import QualityButton from "./QualityButton";
import ImageSaveButton from "./ImageSaveButton";

const ActionsBar = () => {
  return (
    <View style={styles.actionsBarContainer}>
      <View style={styles.actionsBar}>
        <ResetButton />
        <AspectRatioButton />
        <GridLayoutButton />
        <QualityButton />
        <ImageSaveButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 12,
  },
  actionsBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default ActionsBar;
