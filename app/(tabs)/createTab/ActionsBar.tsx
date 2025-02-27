import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "../../../components/createTab/IconButton";
import { sliceImage } from "../../../components/createTab/utils";
import { View, Text, StyleSheet } from "react-native";

const ActionsBar = () => {
  const RunIcon = <Ionicons name="download-outline" size={24} />;

  return (
    <View style={styles.actionsBar} testID="actions-bar">
      <View style={styles.IconsRow}>
        <Text>Actions</Text>
        <IconButton icon={RunIcon} onPress={sliceImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    flex: 0.1,
    margin: 12,
  },
  IconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ActionsBar;
