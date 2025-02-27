import {} from "./utils";
import { View, Text, StyleSheet } from "react-native";

const ActionsBar = () => {
  return (
    <View style={styles.actionsBar} testID="actions-bar">
      <Text>Actions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsBar: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActionsBar;
