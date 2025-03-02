import { View, StyleSheet, Image } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import IconButton from "@/components/IconButton";
import { pickImageAsync, sliceImage } from "@/components/createTab/utils";

const BottomActionsBar = () => {
  const ShareIcon = <Ionicons name="share-outline" size={24} />;
  const AddIcon = <Ionicons name="add-outline" size={24} />;
  const moreIcon = <Ionicons name="ellipsis-horizontal" size={24} />;

  const handleShare = () => {
    sliceImage();
  };

  return (
    <View style={styles.actionsBar} testID="actions-bar">
      <View style={styles.iconsRow}>
        <IconButton icon={moreIcon} onPress={() => {}} />
        <IconButton icon={AddIcon} onPress={pickImageAsync} />
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
    height: 72,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BottomActionsBar;
