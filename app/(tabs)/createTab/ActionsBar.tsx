import { View, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import IconButton from "@/components/createTab/IconButton";
import { sliceImage } from "@/components/createTab/utils";

import { resetImage } from "@/store/slices/imageSlice";
import store from "@/store";

const ActionsBar = () => {
  const RunIcon = <Ionicons name="download-outline" size={24} />;
  const ResetIcon = <Ionicons name="refresh-outline" size={24} />;

  const handleReset = () => {
    store.dispatch(resetImage());
  };

  return (
    <View style={styles.actionsBar} testID="actions-bar">
      <View style={styles.iconsRow}>
        <IconButton icon={ResetIcon} onPress={handleReset} />
        <IconButton icon={RunIcon} onPress={sliceImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    flex: 0.1,
    padding: 12,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ActionsBar;
