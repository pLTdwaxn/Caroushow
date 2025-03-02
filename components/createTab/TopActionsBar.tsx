import AspectRatioLabel from "./AspectRatioLabel";
import { View, StyleSheet } from "react-native";
import SocialMediaSelect from "./SocialMediaSelect";

const TopActionsBar = () => {
  return (
    <View style={styles.topActionsBarContainer}>
      <View style={styles.iconsRow}>
        <SocialMediaSelect />
        <AspectRatioLabel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topActionsBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    backgroundColor: "transparent",
    zIndex: 1,
    paddingTop: 12,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
  },
});

export default TopActionsBar;
