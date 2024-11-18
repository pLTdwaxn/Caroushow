import { View, Text, StyleSheet } from "react-native";

export default function Gallery() {
  return (
    <View style={styles.container}>
      <Text>Gallery Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 0,
  },
});
