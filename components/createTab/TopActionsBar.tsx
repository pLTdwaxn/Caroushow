import AspectRatioLabel from "./AspectRatioLabel";
import {} from "./utils";
import { View, Button, StyleSheet } from "react-native";

const TopActionsBar = () => {
  return (
    <View style={styles.topActionsBarContainer}>
      <View style={styles.iconsRow}>
        <View style={styles.button}>
          <Button title="Select Social Media" />
        </View>
        <View style={styles.aspectRatioLabel}>
          <AspectRatioLabel />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topActionsBarContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
  },
  button: {
    flex: 0.85,
  },
  aspectRatioLabel: {
    flex: 0.15,
  },
});

export default TopActionsBar;
