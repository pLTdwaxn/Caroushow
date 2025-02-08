import { View, StyleSheet } from "react-native";

const ControlPanel = () => {
  return <View style={styles.controlPanel}></View>;
};

const styles = StyleSheet.create({
  controlPanel: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
});

export default ControlPanel;
