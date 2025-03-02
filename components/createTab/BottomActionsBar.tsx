import { View, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import IconButton from "@/components/IconButton";
import { sliceImage } from "@/components/createTab/utils";

import { resetImage } from "@/store/slices/imageSlice";
import store from "@/store";

const BottomActionsBar = () => {
  const ShareIcon = <Ionicons name="share-outline" size={24} />;
  const ResetIcon = <Ionicons name="refresh-outline" size={24} />;

  const handleReset = () => {
    store.dispatch(resetImage());
  };

  const handleShare = () => {
    sliceImage();
  };

  return (
    <View style={styles.actionsBar} testID="actions-bar">
      <View style={styles.iconsRow}>
        <IconButton icon={ResetIcon} onPress={handleReset} />
        <IconButton icon={ShareIcon} onPress={handleShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BottomActionsBar;
